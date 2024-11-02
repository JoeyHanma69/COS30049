from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .model import load_model, preprocess_data
import numpy as np
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
import os
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/"],  # Replace "*" with your frontend's origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
classification_model = load_model("models/classification_model.pkl")
regression_model = load_model("models/regression_model.pkl")
kmeans_model = load_model("models/kmeans_model.pkl")
dbscan_model = load_model("models/dbscan_model.pkl")


# Define input data schema
class PredictionInput(BaseModel):
    temperature: float
    humidity: float

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Weather Prediction API!"}

@app.get("/overview")
def get_overview():
    return {
        "title": "Weather Report Prediction Platform",
        "description": "A platform that provides machine learning-based predictions for weather variables like temperature, rainfall, and solar exposure.",
        "target_users": "Professionals in weather-dependent industries like agriculture, event planning, and research."
    }

@app.get("/features")
def get_features():
    return {"features": ["Temperature prediction", "Rainfall prediction"]}

@app.get("/models")
def get_models():
    return {"models": ["Logistic Regression", "K-Means Clustering", "DBSCAN"]}

@app.post("/predict_rain")
def predict(input_data: PredictionInput):
    # Preprocess the data
    input_features = np.array([[input_data.temperature, input_data.humidity]])
    input_scaled = preprocess_data(input_features, scaler)

    # Make a prediction using the loaded classification model
    prediction = classification_model.predict(input_scaled)[0]
    will_rain = prediction == 1

    # Generate a graph for the prediction
    plt.figure(figsize=(6, 4))
    x = np.linspace(0, 100, 100)
    y = (input_data.humidity / 100) * x if will_rain else (input_data.temperature / 100) * x
    plt.plot(x, y, label="Prediction Curve", color="blue")
    plt.xlabel("X-axis (some feature)")
    plt.ylabel("Prediction value")
    plt.title("Weather Prediction Graph")
    plt.legend()
    graph_path = "prediction_graph.png"
    plt.savefig(graph_path)
    plt.close()

    return {"will_rain": will_rain, "graph": graph_path}

@app.get("/graph")
def get_graph():
    graph_path = "prediction_graph.png"
    if os.path.exists(graph_path):
        return FileResponse(graph_path, media_type="image/png", filename="prediction_graph.png")
    else:
        raise HTTPException(status_code=404, detail="Graph not found") 
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
