import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
import seaborn as sns
import dash
from dash import dcc, html
from dash.dependencies import Input, Output


class Visualization2:
    def __init__(self) -> None:
         self.df = pd.read_csv("Salaryreg.csv")

    def histoage(self):
         fig_age_histogram = px.histogram(self.df, x="Age")
         return fig_age_histogram
    
    def boxplot_salary_jobcategory(self):
        fig_boxplot = px.box(self.df, x='Job Title', y='Salary')
        return fig_boxplot

    def mean_salary_educationlevel(self):
        mean_salary_by_education = self.df.groupby('Education Level')['Salary'].mean().reset_index()
        fig_barplot = px.bar(mean_salary_by_education, x='Education Level', y='Salary')
        return fig_barplot
    
    def kde_salary_distribution(self):
        fig_kde = px.density_contour(self.df, x="Salary", marginal_x="rug", title="Répartition des Salaires (KDE)")
        return fig_kde
    
    def salary_evolution_by_age(self):
        avg_salary_by_age = self.df.groupby('Age')['Salary'].mean().reset_index()
        fig = px.scatter(avg_salary_by_age, x="Age", y="Salary", trendline="lowess",
                         title="Évolution des Salaires par Âge")
        return fig

    def sexe_salary_distribution(self):
        mean_salary_by_gender = self.df.groupby('Gender')['Salary'].mean().reset_index()
        fig = px.bar(mean_salary_by_gender, x='Gender', y='Salary', title='Salaire Moyen par Genre')        
        return fig

    
    
    

    
    
    
    
