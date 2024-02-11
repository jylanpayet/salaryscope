import pandas as pd
import plotly.express as px
import plotly.graph_objs as go






class Visualization2:
    def __init__(self) -> None:
         self.df = pd.read_csv("./Salaryreg.csv")
    
    def boxplot_salary_jobcategory(self):
        fig_boxplot = px.box(self.df, x='Job Title', y='Salary')
        return fig_boxplot

    def mean_salary_educationlevel(self):
        mean_salary_by_education = self.df.groupby('Education Level')['Salary'].mean().reset_index()
        fig_barplot = px.bar(mean_salary_by_education, x='Education Level', y='Salary')
        return fig_barplot
    def salary_by_gender(self):
        fig_salary_by_gender = px.box(self.df, x='Gender', y='Salary',color='Gender', title='Distribution des Salaires par Genre',
                              labels={'Salary': 'Salaire', 'Gender': 'Genre'})
        return fig_salary_by_gender
    def experience_vs_salary(self):
        fig_experience_vs_salary = px.scatter(self.df, x='Years of Experience', y='Salary', color="Education Level",
                                      title='Années d’Expérience vs. Salaire par Niveau d’Éducation',
                                      labels={'Years of Experience': 'Années d’Expérience', 'Salary': 'Salaire'},
                                      category_orders={"Education Level Label": ['Non spécifié', 'Niveau 1', 'Niveau 2', 'Niveau 3']})
        return fig_experience_vs_salary
    
    def job_title_by_gender(self):
        job_counts = self.df.groupby('Job Title').filter(lambda x: len(x) > 50)
        fig_job_title_by_gender = px.histogram(job_counts, x='Job Title', color='Gender', barmode='group',
                                       title='Répartition des Titres de Poste par Genre',
                                       labels={'Job Title': 'Titre de Poste', 'Gender': 'Genre'})
        return fig_job_title_by_gender
    
    def education_vs_salary(self):
        fig_education_vs_salary = px.box(self.df, x='Education Level', y='Salary',color='Education Level',
                                 title='Corrélation entre Niveau d’Éducation et Salaire',
                                 labels={'Education Level Label': 'Niveau d’Éducation', 'Salary': 'Salaire'})
        return fig_education_vs_salary
