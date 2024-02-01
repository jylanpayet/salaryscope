import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from joblib import dump

df = pd.read_csv("./Salaryreg.csv")
print(df)
new_df = pd.get_dummies(df,columns = ["Gender", "Education Level", "Job Title", "Country", "Race"])
scaler = StandardScaler()
columns_need_scaling = ["Age", "Years of Experience"]
new_df[columns_need_scaling] = scaler.fit_transform(new_df[columns_need_scaling])
X = new_df.drop(["Salary"], axis = 1)
y = new_df["Salary"]

train_x, test_x, train_y, test_y = train_test_split(X, y, test_size = 0.2, random_state = 42)
model_Random_Forest_Regression = RandomForestRegressor(n_estimators=50,criterion='squared_error')
model_Random_Forest_Regression.fit(train_x,train_y)
y_pred = model_Random_Forest_Regression.predict(test_x)
precision = model_Random_Forest_Regression.score(test_x,test_y)

print(f"Précision: {precision *100}%")

#RandomForest 97% n_estimators 50 criterion squared_error