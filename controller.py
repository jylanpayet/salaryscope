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
modeleRandom = load('modelRegression.joblib')
column_names = pd.read_csv('columns.csv', header=None).squeeze()

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


@app.route('/prediction',methods=["GET"])
def prediction():
    gender = request.args.get('gender', type=str)
    education_level = request.args.get('education_level', type=int)
    job_title = request.args.get('job_title', type=str)
    country = request.args.get('country', type=str)
    race = request.args.get('race', type=str)
    age = request.args.get('age', type=int)
    years_of_experience = request.args.get('years_of_experience', type=int)
    senior = request.args.get('senior', type=int)
    modele_Random = modeleRandom
    local_empty_df = pd.DataFrame(columns=column_names)
    local_empty_df = local_empty_df.drop(local_empty_df.columns[0], axis=1)
    local_empty_df = local_empty_df.drop(['Salary'],axis=1)
    local_empty_df.loc[0] = False
    local_empty_df.at[0, f'Gender_{gender}'] = True
    local_empty_df.at[0, 'Senior'] = senior
    local_empty_df.at[0, f'Education Level_{education_level}'] = True
    local_empty_df.at[0, f'Job Title_{job_title}'] = True
    local_empty_df.at[0, f'Country_{country}'] = True
    local_empty_df.at[0, f'Race_{race}'] = True
    local_empty_df.at[0, 'Age'] = age
    local_empty_df.at[0, 'Years of Experience'] = years_of_experience
    scaler = StandardScaler()
    columns_need_scaling = ["Age", "Years of Experience"]
    local_empty_df[columns_need_scaling] = scaler.fit_transform(local_empty_df[columns_need_scaling])
    Y_pred = modele_Random.predict(local_empty_df)
    return jsonify({
        "Prediction":Y_pred[0]
    })


if __name__ == "__main__":
    app.run(debug=True)
    