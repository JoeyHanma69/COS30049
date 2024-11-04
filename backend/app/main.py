from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle 
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allowing cross-origin requests from all origins

# Load models
with open('backend/models/classification_model.pkl', 'rb') as f:
    # classification_model = pickle.load(f) 
    classification_model = joblib.load(f)
with open('backend/models/regression_model.pkl', 'rb') as f:
    regression_model = pickle.load(f)
with open('backend/models/kmeans_model.pkl', 'rb') as f:
    kmeans_model = pickle.load(f)
with open('backend/models/dbscan_model.pkl', 'rb') as f:
    dbscan_model = pickle.load(f)
with open('backend/models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)


@app.route('/')
def read_root():
    return {"Message": "Welcome to the Weather Prediction API!"}

@app.route('/overview', methods=['GET'])
def get_overview():
    return {
        "title": "Weather Report Prediction Platform",
        "description": "A platform that provides machine learning-based predictions for weather variables like temperature, rainfall, and solar exposure.",
        "target_users": "Professionals in weather-dependent industries like agriculture, event planning, and research."
    }

@app.route('/features', methods=['GET'])
def get_features():
    return {"features": ["Temperature prediction", "Rainfall prediction"]}

@app.route('/models', methods=['GET'])
def get_models():
    return {"models": ["Logistic Regression", "K-Means Clustering", "DBSCAN"]}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Receiving the data from the frontend and turning it into JSON

    date = datetime.strptime(data['date'], '%Y-%m-%d')
    temperature = data['temperature']
    humidity = data['humidity']

    # Convert input data to DataFrame
    input_data = pd.DataFrame({
        'temperature': [temperature],
        'humidity': [humidity],
        'year': [date.year],
        'month': [date.month]
    })

    # Preprocess input data
    X_transformed = scaler.transform(input_data[['temperature', 'humidity']])

    # Make predictions
    classification_pred = classification_model.predict(X_transformed)[0]
    regression_pred = regression_model.predict(X_transformed)[0]

    # Perform clustering
    cluster = kmeans_model.predict(X_transformed)[0]

    # Generate a prediction graph
    plt.figure(figsize=(6, 4))
    x = np.linspace(0, 100, 100)
    y = (humidity / 100) * x if classification_pred else (temperature / 100) * x
    plt.plot(x, y, label="Prediction Curve", color="blue")
    plt.xlabel("X-axis (some feature)")
    plt.ylabel("Prediction value")
    plt.title("Weather Prediction Graph")
    plt.legend()
    graph_path = "static/prediction_graph.png"
    plt.savefig(graph_path)
    plt.close() 
    
    print(request.json)

    # Return the predictions
    return jsonify({
        'classification_prediction': int(classification_pred),
        'regression_prediction': float(regression_pred),
        'cluster': int(cluster),
        'graph': graph_path
    })

if __name__ == '__main__':
    app.run(debug=True, port=8000)


