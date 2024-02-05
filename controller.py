from flask import Flask, jsonify, request
import json
import plotly.utils
from sklearn.discriminant_analysis import StandardScaler
from dataVisualization import Visualization
from joblib import load
import pandas as pd

app = Flask(__name__)
vis = Visualization()

modeleSVC = load('model_SVC.joblib')
# Charger les modèles et transformateurs
modeleRandom = load('model11.joblib')
encoding = load('encoding.joblib')
scaler = load('scaler.joblib')
pca = load('pca.joblib')

@app.route("/visualization")
def visualization():
    heuresParSemaineBySalary = json.dumps(vis.heuresParSemaineBySalary(), cls=plotly.utils.PlotlyJSONEncoder)
    repartitionSalaryInTheWorld = json.dumps(vis.repartitionSalaryInTheWorld(), cls=plotly.utils.PlotlyJSONEncoder)
    trancheSalary = json.dumps(vis.trancheSalarialParRace(), cls=plotly.utils.PlotlyJSONEncoder)
    positiveCapitalByWorkclass = json.dumps(vis.positive_capital_by_workclass(), cls=plotly.utils.PlotlyJSONEncoder)
    positiveCapitalByEducation = json.dumps(vis.positive_capital_by_education(), cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify({"repartitionSalaryInTheWorld": repartitionSalaryInTheWorld,
                    "trancheSalary":trancheSalary,
                    "positiveCapitalByWorkclass":positiveCapitalByWorkclass,
                    "heuresParSemaineBySalary":heuresParSemaineBySalary,
                    "positiveCapitalByEducation":positiveCapitalByEducation
                    })

@app.route("/stats")
def stat():
    age_mean,user_nbr,salary_mean = vis.stats()
    return jsonify({
        "age_mean":age_mean.to_json(),
        "user_nbr":user_nbr,
        "salary_mean":salary_mean.to_json()
    })


@app.route('/prediction', methods=["GET"])
def prediction():
    data = {
        "Age" : request.args.get('age', type=int),
        "Gender":request.args.get('gender', type=str),
        "Education Level" :request.args.get('education_level', type=int),
        "Job Title" : request.args.get('job_title', type=str),
        "Years of Experience" : request.args.get('years_of_experience', type=str),   
        "Race" : request.args.get('race', type=str)} 
    local_empty_df = pd.DataFrame([data])
    print(local_empty_df)
    encode = ["Gender", "Education Level", "Job Title", "Race"]
    columns_need_scaling = ["Age", "Years of Experience"]
    local_empty_df[encode] = encoding.transform(local_empty_df[encode])
    local_empty_df[columns_need_scaling] = scaler.transform(local_empty_df[columns_need_scaling])
    pca.transform(local_empty_df)
    Y_pred = modeleRandom.predict(local_empty_df)
    return jsonify({
        "Prediction":Y_pred[0]
    })



if __name__ == "__main__":
    app.run(debug=True)


