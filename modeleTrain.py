import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import confusion_matrix
from sklearn.metrics import precision_score
from sklearn.svm import SVC
from joblib import dump

file_path = './salary.csv'
salary_data = pd.read_csv(file_path)
print(salary_data)
# Convertir la colonne 'salary' en chaîne de caractères
salary_data['salary'] = salary_data['salary'].astype(str)
# Séparation des caractéristiques et de la cible
X = salary_data.drop(['salary'], axis=1)
y = salary_data['salary']
y = y.apply(lambda x: 1 if x.strip() == '>50K' else 0)
print(X.shape)
print(y.shape)
# Identification des colonnes catégorielles et numériques
categorical_cols = X.select_dtypes(include=['object', 'category']).columns
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns
print(categorical_cols)
print(numerical_cols)
#Prétraitement pour les données numériques et catégorielles
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)])
#Division des données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)

model_SVC = Pipeline(steps=[('preprocessor', preprocessor),
                                 ('classifier', SVC(gamma=0.001,C=0.6,kernel='sigmoid'))])
model_SVC.fit(X_train,y_train)
y_pred = model_SVC.predict(X_test)
precision = precision_score(y_test, y_pred)
confusion = confusion_matrix(y_test,y_pred)
print("Précision: ", precision)
print("Confusion: ",confusion)
dump(model_SVC, 'model_SVC.joblib') 