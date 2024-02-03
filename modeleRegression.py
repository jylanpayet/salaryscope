import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from joblib import dump

df = pd.read_csv("./Salaryreg.csv")
new_df = pd.get_dummies(df,columns = ["Gender", "Education Level", "Job Title", "Country", "Race"])
scaler = StandardScaler()
columns_need_scaling = ["Age", "Years of Experience"]
new_df[columns_need_scaling] = scaler.fit_transform(new_df[columns_need_scaling])
X = new_df.drop(["Salary"], axis = 1)
y = new_df["Salary"]
model_Random_Forest_Regression = RandomForestRegressor(n_estimators=50,criterion='squared_error')
test_sizes = [0.2, 0.3, 0.4]
cv_scores = {}

for size in test_sizes:
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=size, random_state=42)
    model_Random_Forest_Regression.fit(train_x, train_y)
    scores = cross_val_score(model_Random_Forest_Regression, train_x, train_y, cv=3, scoring='r2')
    precision = model_Random_Forest_Regression.score(test_x, test_y)
    y_pred = model_Random_Forest_Regression.predict(test_x)
    mse = mean_squared_error(test_y, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(test_y, y_pred)
    cv_scores[f"CV Taille : {size}"] = scores.mean()
    cv_scores[f"Test Précision Taille : {size}"] = precision * 100
    cv_scores[f"MSE Taille : {size}"] = mse
    cv_scores[f"RMSE Taille : {size}"] = rmse
    cv_scores[f"MAE Taille : {size}"] = mae

metrics_df = pd.DataFrame([cv_scores])

metrics_df.to_excel("Metrics.xlsx", index=False)



#RandomForest 97% n_estimators 50 criterion squared_error