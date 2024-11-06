import os
import pickle
import joblib
import pandas as pd 
import matplotlib.pyplot as plt 
from sklearn.linear_model import LinearRegression 
from sklearn.model_selection import train_test_split 
from sklearn.metrics import mean_squared_error, r2_score 

dirname = os.path.dirname(__file__)

class Regression:
    def __init__(self): 
        self.model = LinearRegression()

    def train(self):
        df = pd.read_csv('backend/app/ML/cleaned_dataset.csv') 

        x = df[['Year', 'Month', 'Day', 'Period over which rainfall was measured (days)']]  
        y = df['Rainfall amount (millimetres)'] 

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42) 

        self.model.fit(x_test.values, y_test.values) 

        filename = os.path.join(dirname, '../models/test.pkl')
        joblib.dump(self.model, filename)

    def predict(self, year, month, day, rainfall): 
        filename = os.path.join(dirname, '../models/test.pkl')
        model = joblib.load(filename)

        return model.predict([[year, month, day, rainfall]])[0]

    def graph(self): 
        df = pd.read_csv('backend/app/ML/cleaned_dataset.csv') 

        x = df[['Year', 'Month', 'Day', 'Period over which rainfall was measured (days)']]  
        y = df['Rainfall amount (millimetres)'] 

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42) 

        model = LinearRegression() 
        model.fit(x_test, y_test) 
        y_pred = model.predict(x_test)  

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
    
if __name__ == '__main__': 
    model = Regression()

    model.train()

    prediction = model.predict(2024, 5, 3, 5)
    print(prediction)