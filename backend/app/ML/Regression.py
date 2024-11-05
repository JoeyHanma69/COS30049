import os 
import pickle
import pandas as pd 
import matplotlib.pyplot as plt 
import warnings  
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression 
from sklearn.metrics import mean_squared_error, r2_score 

warnings.filterwarnings('ignore') 

df = pd.read_csv(r"C:\Users\cucum\Downloads\COS30049\assignment 2\cleaned_dataset.csv") 

X = df[['Year', 'Month', 'Day', 'Period over which rainfall was measured (days)']]  

y = df['Rainfall amount (millimetres)'] 

X.fillna(X.median(), inplace=True)
y.fillna(y.median(), inplace=True) 

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) 

model = LinearRegression() 
model.fit(X_test, y_test) 
y_pred = model.predict(X_test)  

mse = mean_squared_error(y_test, y_pred)  
r2 = r2_score(y_test, y_pred) 

print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R-squared (R2): {r2:.2f}")
 
plt.figure(figsize=(10, 6)) 
plt.scatter(y_test, y_pred, color='blue') 
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)
plt.xlabel('Actual Rainfall (millimetres)')
plt.ylabel('Predicted Rainfall (millimetres)')
plt.title('Actual vs Predicted Rainfall')
plt.show() 

model_dir = os.path.dirname(__file__)

model_path = os.path.join(model_dir, 'regression_model.pkl') 
with open(model_path, 'wb') as f:  
    pickle.dump(model, f) 
    
print(f"Regression model saved to {model_path}")
    