from flask import Flask, jsonify, request
import json
import plotly.utils
from dataVisualization import Visualization
from joblib import load

app = Flask(__name__)
vis = Visualization()
modeleSVC = load('model_SVC.joblib')
modeleRandom = load('modelRegression.joblib')

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


@app.route('/prediction')
def prediction():
    modele_SVC = modeleSVC
    modele_Random = modeleRandom
    print(modele_SVC)
    print(modele_Random)
    return jsonify({
        "test":"ls"
    })


if __name__ == "__main__":
    app.run(debug=True)
    