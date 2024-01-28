import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

class Visualization:
    def __init__(self) -> None:
        self.df = pd.read_csv("./salary.csv")
        self.df['salary_numeric'] = self.df['salary'].astype(str).apply(lambda x: 1 if x.strip() == '>50K' else 0)
        self.df['positive_capital'] = self.df['capital-gain'].apply(lambda x: x if x > 0 else 0)
        self.df['negative_capital'] = self.df['capital-loss'].apply(lambda x: -x if x > 0 else 0)

    def heuresParSemaineBySalary(self):
        fig_hours_salary = px.scatter(self.df, x='hours-per-week', y='salary_numeric', 
                                    color='workclass', 
                                    labels={'hours-per-week': 'Heures travaillées par semaine',
                                            'salary_numeric': 'Salaire (1: >50K, 0: <=50K)',
                                            'workclass': 'Classe de travail'},
                                    trendline='ols')
        fig_hours_salary.update_layout(coloraxis_colorbar=dict(
            title='Classe de Travail',
            tickvals=self.df['workclass'].unique(),
            ticktext=self.df['workclass'].unique()
        ))
        fig_hours_salary.update_traces(selector=dict(mode='markers'), marker=dict(opacity=0))
        return fig_hours_salary
    
    def repartitionSalaryInTheWorld(self):
        avg_salary_by_country = self.df.groupby('native-country')['salary_numeric'].mean().reset_index()
        avg_salary_by_country['salary_numeric'] *= 100
        fig_geo_salary = px.choropleth(avg_salary_by_country, locations="native-country", 
                           locationmode='country names', color="salary_numeric", 
                           color_continuous_scale=px.colors.sequential.Plasma)
        
        return fig_geo_salary

    def trancheSalarialParRace(self):
        race_gender_salary = self.df.groupby(['race', 'sex', 'salary']).size().reset_index(name='count')
        fig_race_gender_salary = px.bar(race_gender_salary, x="race", y="count", color="sex",
                                facet_col="salary",labels={'count':'Count', 'race':'Race', 'sex':'Gender', 'salary':'Salary Bracket'})
        return fig_race_gender_salary


    def positive_capital_by_workclass(self):
        fig_workclass = px.histogram(self.df, x="workclass", y=["positive_capital", "negative_capital"],color_discrete_sequence=["green", "red"])
        return fig_workclass
    
    def positive_capital_by_education(self):
        fig_education = px.histogram(self.df, x="education", y=["positive_capital", "negative_capital"],color_discrete_sequence=["blue", "orange"]) 
        return fig_education
    
