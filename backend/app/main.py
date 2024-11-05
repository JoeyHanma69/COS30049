from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
import numpy as np
import joblib
from sklearn.cluster import DBSCAN, KMeans

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

# Define input model using Pydantic
class PredictionRequest(BaseModel):
    year: int
    month: int
    day: int
    rainfall: float
    period: float

@app.post("/predict")
async def predict_rainfall(data: PredictionRequest):
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([{
            'Year': data.year,
            'Month': data.month,
            'Day': data.day,
            'Rainfall amount (millimetres)': data.rainfall,
            'Period over which rainfall was measured (days)': data.period
        }])

        # Make predictions
        prediction = classification_model.predict(input_data)[0]

        # Return the prediction
        return {"will_rain": bool(prediction)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 
    
@app.post("/cluster")
async def perform_clustering(data: PredictionRequest):
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([{
            'year': data.year,
            'month': data.month,
            'day': data.day,
            'rainfall': data.rainfall,
            'period': data.period,
        }])

        # Preprocess input data using the pre-trained scaler
        X_transformed = scaler.transform(input_data)

        # Predict the cluster using KMeans
        kmeans_cluster = kmeans_model.predict(X_transformed)

        # Predict the cluster using DBSCAN
        dbscan_cluster = dbscan_model.fit_predict(X_transformed)

        # Count the number of clusters and noise points in DBSCAN
        num_clusters_kmeans = len(set(kmeans_cluster)) - (1 if -1 in kmeans_cluster else 0)
        num_noise_dbscan = list(dbscan_cluster).count(-1)

        return {
            "kmeans_cluster": int(kmeans_cluster[0]),
            "dbscan_cluster": int(dbscan_cluster[0]),
            "num_clusters_kmeans": num_clusters_kmeans,
            "num_noise_dbscan": num_noise_dbscan
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

 
# Run with: uvicorn main:app --reload


