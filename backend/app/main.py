from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load models using joblib
classification_model = joblib.load('./app/models/classification_model.pkl')
regression_model = joblib.load('./app/models/regression_model.pkl')
kmeans_model = joblib.load('./app/models/kmeans_model.pkl')
dbscan_model = joblib.load('./app/models/dbscan_model.pkl')
scaler = joblib.load('./app/models/scaler.pkl')

# Define input model using Pydantic
class PredictionRequest(BaseModel):
    date: str  # Expected format: 'YYYY-MM-DD'
    humidity: float
    temperature: float

@app.get("/")
async def read_root():
    return {"Message": "Welcome to the Weather Prediction API!"}

@app.get("/overview")
async def get_overview():
    return {
        "title": "Weather Report Prediction Platform",
        "description": "A platform that provides machine learning-based predictions for weather variables like temperature, rainfall, and solar exposure.",
        "target_users": "Professionals in weather-dependent industries like agriculture, event planning, and research."
    }

@app.get("/features")
async def get_features():
    return {"features": ["Temperature prediction", "Rainfall prediction"]}

@app.get("/models")
async def get_models():
    return {"models": ["Logistic Regression", "K-Means Clustering", "DBSCAN"]}

@app.post("/predict")
async def predict(data: PredictionRequest):
    try:
        # Parse date
        print(data)
        date = datetime.strptime(data.date, '%Y-%m-%d')
        
        # Convert input data to DataFrame
        input_data = pd.DataFrame({
            'temperature': [data.temperature],
            'humidity': [data.humidity],
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
        y = (data.humidity / 100) * x if classification_pred else (data.temperature / 100) * x
        plt.plot(x, y, label="Prediction Curve", color="blue")
        plt.xlabel("X-axis (some feature)")
        plt.ylabel("Prediction value")
        plt.title("Weather Prediction Graph")
        plt.legend()
        graph_path = "static/prediction_graph.png"
        plt.savefig(graph_path)
        plt.close()

        return {
            'data': data
        }

        # Return the predictions
        return {
            'classification_prediction': None,  # Replace with int(classification_pred)
            'regression_prediction': None,      # Replace with float(regression_pred)
            'cluster': None,                    # Replace with int(cluster)
            'graph': None                       # Replace with graph_path if needed
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
 
 
# Run with: uvicorn main:app --reload


