import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
import seaborn as sns



class Visualization2:
    def __init__(self) -> None:
         self.df = pd.read_csv("./Salaryreg.csv")

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

    
    
