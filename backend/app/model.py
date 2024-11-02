import pickle
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error

# Utility functions for training, saving, loading, and predicting models

# Function to load a model from a given file path
def load_model(model_path):
    with open(model_path, 'rb') as model_file:
        model = pickle.load(model_file)
    return model

# Function to save a model to a given file path
def save_model(model, model_path):
    with open(model_path, 'wb') as model_file:
        pickle.dump(model, model_file)

# Function to preprocess data using a scaler
def preprocess_data(data, scaler=None):
    if scaler is None:
        scaler = StandardScaler()
        scaler.fit(data)
        save_model(scaler, 'models/scaler.pkl')  # Save scaler for future use
    return scaler.transform(data)

# Function to train a Logistic Regression model for classification
def train_classification_model(data_path):
    data = pd.read_csv(data_path)
    X = data[['temperature', 'humidity']]
    y = data['will_rain']
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    save_model(scaler, 'models/scaler.pkl')

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    save_model(model, 'models/classification_model.pkl')
    
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    return f"Classification model trained with accuracy: {accuracy:.2f}"

# Other training functions (Regression, KMeans, DBSCAN) remain the same

