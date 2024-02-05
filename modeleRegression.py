from joblib import dump, load
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
from sklearn.decomposition import PCA



class SalaryPredictionModel:
    def __init__(self, data_path):
        self.data_path = data_path
        self.df = None
        self.X = None
        self.y = None
        self.model = GradientBoostingRegressor(random_state=42)
        self.cv_scores = {}
        self.scaler = StandardScaler()
        self.encoding = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)

    def load_and_prepare_data(self):
        self.df = pd.read_csv(self.data_path)
        self.encode_categorical_columns()
        self.scale_data()
        self.X = self.df.drop(["Salary","Country","Senior"], axis=1)
        self.y = self.df["Salary"]
        self.dimension_Reduction()

    def encode_categorical_columns(self):
        categorical_features = ["Gender", "Education Level", "Job Title", "Race"]
        self.df[categorical_features] = self.encoding.fit_transform(self.df[categorical_features])
        dump(self.encoding,"encoding.joblib")


    def scale_data(self):
        columns_need_scaling = ["Age", "Years of Experience"]
        self.df[columns_need_scaling] = self.scaler.fit_transform(self.df[columns_need_scaling])
        dump(self.scaler,"scaler.joblib")

    def dimension_Reduction(self):
        pca = PCA(0.95)
        pca.fit_transform(self.X)
        dump(pca,"pca.joblib")

    def train_and_evaluate(self):
        train_x, test_x, train_y, test_y = train_test_split(self.X, self.y, test_size=0.2, random_state=42)
        self.model.fit(train_x, train_y)
        print("Score R2")

    def predict(self,x):
        return self.model.predict(x)

    def save_metrics_and_model(self, metrics_path="Metrics.xlsx"):
        metrics_df = pd.DataFrame([self.cv_scores])
        metrics_df.to_excel(metrics_path, index=False)
        
    

    def run(self):
        self.load_and_prepare_data()
        self.train_and_evaluate()
        dump(self.model,"model11.joblib")
        self.save_metrics_and_model()
        


model = SalaryPredictionModel("./Salaryreg.csv")
model.run()
