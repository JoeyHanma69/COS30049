from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .model import load_model, predict
import pandas as pd  
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load models
classification_model, regression_model = load_model()

# Define input data schema
class PredictionInput(BaseModel):
    temperature: float
    humidity: float

@app.post("/") 
async def read_root(): 
    return {"Message" : "Welcome to the Weather Prediction API!"}  

@app.get("/overview") 
def get_overview(): 
    return {  
        "title": "Weather Report Prediction Platform",
        "description": "A platform that provides machine learning-based predictions for weather variables like temperature, rainfall, and solar exposure.",
        "target_users": "Professionals in weather-dependent industries like agriculture, event planning, and research."
        } 
    
@app.get("/features") 
def get_features(): 
    return {  
            'features' : [  
                        "Predicts temperature, rainfall, and solar exposure",
                        "Interactive and user-friendly platform",
                        "Uses Logistic Regression, K-Means, and DBSCAN models for predictions"
                ]
            } 
    
@app.get("/models") 
def get_models(): 
    return { 
            'models': [  
                {"name": "Logistic Regression", "type": "Classification", "use_case": "Predict whether it will rain"},
                {"name": "K-Means", "type": "Clustering", "use_case": "Group weather data based on temperature and rainfall"},
                {"name": "DBSCAN", "type": "Anomaly Detection", "use_case": "Identify anomalies in weather data"}
                ]
            } 
@app.post("/predict")
def predict(data: dict, model_type: str):
    model = classification_model if model_type == "classification" else regression_model
    input_data = np.array([data["features"]])
    result = model.predict(input_data)[0]
    return {"prediction": result}

@app.post("/predict/classification")
async def classify(input_data: PredictionInput):
    try:
        # Prepare data for prediction
        data = [[input_data.temperature, input_data.humidity]]
        # Call the predict function with the classification model
        prediction = predict(classification_model, data, model_type='classification')
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/regression")
async def regress(input_data: PredictionInput):
    try:
        # Prepare data for prediction
        data = [[input_data.temperature, input_data.humidity]]
        # Call the predict function with the regression model
        prediction = predict(regression_model, data, model_type='regression')
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
