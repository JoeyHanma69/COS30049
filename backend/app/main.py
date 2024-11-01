from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .model import load_model, predict
import pandas as pd  
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origins in production
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
