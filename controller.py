from flask import Flask, jsonify, request
import json
import plotly.utils
from dataVisualization import Visualization
from dataVisualization2 import Visualization2
from joblib import load
import pandas as pd
from flask import Flask, render_template, request

server = Flask(__name__)
vis = Visualization()
vis2 = Visualization2()



modeleSVC = load('model_SVC.joblib')
# Charger les modèles et transformateurs
modeleRandom = load('model11.joblib')
encoding = load('encoding.joblib')
scaler = load('scaler.joblib')
pca = load('pca.joblib')

@server.route("/visualization")
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

@server.route("/visualization2")
def visualization2():
    boxplot_salary_jobcategory = json.dumps(vis2.boxplot_salary_jobcategory(), cls=plotly.utils.PlotlyJSONEncoder)
    mean_salary_educationlevel = json.dumps(vis2.mean_salary_educationlevel(), cls=plotly.utils.PlotlyJSONEncoder)
    salary_by_gender = json.dumps(vis2.salary_by_gender(), cls=plotly.utils.PlotlyJSONEncoder)
    experience_vs_salary = json.dumps(vis2.experience_vs_salary(), cls=plotly.utils.PlotlyJSONEncoder)
    job_title_by_gender = json.dumps(vis2.job_title_by_gender(), cls=plotly.utils.PlotlyJSONEncoder)
    education_vs_salary = json.dumps(vis2.education_vs_salary(), cls=plotly.utils.PlotlyJSONEncoder)
    kde_salary_distribution = json.dumps(vis2.kde_salary_distribution(), cls=plotly.utils.PlotlyJSONEncoder)
    salary_evolution_by_age = json.dumps(vis2.salary_evolution_by_age(), cls=plotly.utils.PlotlyJSONEncoder)
    sexe_salary_distribution = json.dumps(vis2.sexe_salary_distribution(), cls=plotly.utils.PlotlyJSONEncoder)
    return jsonify({"salary_by_gender":salary_by_gender,
                    "boxplot_salary_jobcategory":boxplot_salary_jobcategory,
                    "mean_salary_educationlevel":mean_salary_educationlevel,
                    "experience_vs_salary":experience_vs_salary,
                    "job_title_by_gender":job_title_by_gender,
                    "education_vs_salary":education_vs_salary,
                    "kde_salary_distribution": kde_salary_distribution,
                    "salary_evolution_by_age": salary_evolution_by_age,
                    "sexe_salary_distribution": sexe_salary_distribution,
                })

@server.route("/stats")
def stat():
    age_mean,user_nbr,salary_mean = vis.stats()
    return jsonify({
        "age_mean":age_mean.to_json(),
        "user_nbr":user_nbr,
        "salary_mean":salary_mean.to_json()
    })

@server.route("/stats2")
def stat2():
    age_mean,user_nbr,salary_mean = vis2.stats2()
    return jsonify({
        "age_mean":age_mean.to_json(),
        "user_nbr":user_nbr,
        "salary_mean":salary_mean.to_json()
    })

@server.route('/prediction', methods=["GET"])
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
    server.run(debug=True)


