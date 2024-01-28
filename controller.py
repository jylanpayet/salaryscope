from flask import Flask, jsonify, request
import json
import plotly.utils
from dataVisualization import Visualization  

app = Flask(__name__)
vis = Visualization()

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

if __name__ == "__main__":
    app.run(debug=True)
    