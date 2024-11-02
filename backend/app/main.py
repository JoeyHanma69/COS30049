from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .model import load_model, predict
import pandas as pd  
import numpy as np 
import matplotlib.pyplot as plt
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
    
@app.post("/predict_rain")
def predict(temperature: float, humidity: float):
    will_rain = temperature < 25 and humidity > 50 
    
    plt.figure(figsize=(6,4)) 
    x = np.linspace(0, 100, 100) 
    y = (humidity/ 100) * x if will_rain else (temperature / 100) * x 
    plt.plot(x, y, label="Prediction Curve", color="blue")
    plt.xlabel("X-axis (some feature)")
    plt.ylabel("Prediction value")
    plt.title("Weather Prediction Graph")
    plt.legend()
    graph_path = "prediction_graph.png"
    plt.savefig(graph_path)
    plt.close()

    return {"will_rain": will_rain, "graph": graph_path}


    