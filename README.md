# React + Vite - Ryan Gosling Fan Club (Joseph Linao, Belal Nur, Woosung Yang)



Here's a sample README for your **Weather Report Prediction** project that includes setup instructions, required libraries, and steps for running both the front-end and back-end, as well as configuring the AI model integration:

---

# Weather Report Prediction

This project provides weather report predictions based on historical data and includes a front-end for user interaction and a back-end for data processing. The AI model integrated into the back end provides predictions based on pre-trained machine learning algorithms. 

## Table of Contents

- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Running Instructions](#running-instructions)
  - [Back-End Server](#back-end-server)
  - [Front-End Application](#front-end-application)
- [Configuration for AI Model Integration](#configuration-for-ai-model-integration)

---

## Project Structure

```
Weather-Report-Prediction/
│
├── frontend/             # Contains the front-end React application
├── backend/              # Contains the back-end FastAPI application
│   ├── models/           # AI models and data processing scripts
│   ├── main.py           # Main API application file
│   └── requirements.txt  # Python dependencies for back end
│
├── data/                 # Directory for any data files (if applicable)
└── README.md             # Project documentation
```

---

## Requirements

### Front-End (React)

- **Node.js**: v14+ (for npm)
- **React**: v17+
- **Axios**: for API requests

### Back-End (FastAPI & Python)

- **Python**: v3.8+
- **FastAPI**: for handling API requests
- **Uvicorn**: ASGI server for serving FastAPI
- **scikit-learn**, **pandas**, **numpy**: for AI model processing and data handling
- **d3**, **react-plotly.js**: to present the AI model’s predictions

> **Note**: All required Python libraries for the back end are listed in `backend/requirements.txt`.

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/JoeyHanma69/Weather-Report-Prediction.git
cd Weather-Report-Prediction
```

### Back-End Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Set up a virtual environment (recommended):
   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows, use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Front-End Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```
##Optional for frontend if you dont have these: 
```bash
   npm install react-plotly.js plotly.js
   ```
and/or 
```bash
   npm install d3
   ```
---

## Running Instructions

### Back-End Server

1. Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn main.app:main --reload
   ```

2. Once started, the API documentation will be available at:
   - **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Redoc UI**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Front-End Application

1. In a new terminal, navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

3. The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Configuration for AI Model Integration

### Preparing the Model

1. Ensure the model is saved in the `backend/models` directory with the necessary code to load and preprocess data.
   
2. Update `backend/main.py` to load and initialize the model on server startup if not done automatically.

### API Endpoints
## API Endpoints Overview

### Default Endpoints

**GET**  
`/`  
*Read Root*  

- **Purpose**: This endpoint is typically used to test if the API is up and running.  
- **Response**: A simple response with a welcome message, like "Welcome to the Weather Prediction API!".  
- **How to use**: Click on this endpoint, then click "Try it out" and "Execute" to receive a response.

**GET**  
`/overview`  
*Get Overview*  

- **Purpose**: Provides a summary overview of the application.  
- **Response**: Contains key information like the platform title, description, and target users.  
  - **Title**: Name of the platform (e.g., "Weather Report Prediction Platform").  
  - **Description**: What the application does (e.g., "A platform that provides machine learning-based predictions for weather variables").  
  - **Target Users**: Who would benefit from this application (e.g., "Professionals in weather-dependent industries").  
- **How to use**: Click "Try it out" to get information about the app.

**GET**  
`/features`  
*Get Features*  

- **Purpose**: To get a list of features that the application supports, like temperature and rainfall prediction.  
- **Response**: A JSON object listing available features, such as `["Temperature prediction", "Rainfall prediction"]`.  
- **How to use**: Click "Try it out" to see all available features.

**GET**  
`/models`  
*Get Models*  

- **Purpose**: This endpoint gives a list of machine learning models implemented in the app, such as Logistic Regression, K-Means Clustering, and DBSCAN.  
- **Response**: The list of models available for use in predictions.  
- **How to use**: Click "Try it out" to retrieve the names of the models in use.

**POST**  
`/predict`  
*Predict Rainfall*  

- **Purpose**: To predict weather-related variables, such as the likelihood of rain based on input features like temperature, humidity, date, etc.  
- **Input**: JSON data containing relevant input values:  
  - `date`: The date of prediction (YYYY-MM-DD format).  
  - `temperature`: A floating-point value for temperature.  
  - `humidity`: A floating-point value for humidity.  
- **Response**: Returns:  
  - `classification_prediction`: Predicted weather condition.  
  - `regression_prediction`: Expected rainfall amount.  
  - `cluster`: Cluster information.  
  - `graph`: Graph path for visualization if available.  
- **How to use**: Click on "Try it out," enter the necessary fields, and press "Execute" to get the prediction.

**POST**  
`/cluster`  
*Perform Clustering*  

- **Purpose**: This endpoint is used to perform clustering analysis using KMeans or DBSCAN.  
- **Input**: JSON data containing weather-related features.  
- **Response**: Returns clustering details such as:  
  - The number of clusters identified.  
  - Noise points (in the case of DBSCAN).  
- **How to use**: Enter relevant inputs to perform clustering.

**POST**  
`/regression`  
*Predict Future Rainfall*  

- **Purpose**: This endpoint is used for making predictions using a regression model.  
- **Input**: Takes features like:  
  - `year`: The year of prediction.  
  - `month`: The month of prediction.  
  - `day`: The day of prediction.  
  - `rainfall`: Current rainfall.   
- **Response**: Provides numerical predictions for rainfall or other variables based on regression modeling.  
- **How to use**: Click "Try it out," enter the relevant features, and execute it to get the regression-based prediction.



2. Update the front end to send a POST request to the `/predict` endpoint using Axios or Fetch API.

### Additional Configurations

- **Environment Variables**: If your project requires sensitive information (e.g., API keys or database URLs), add these to environment files:
   - For back end: create a `.env` file in the `backend` directory.
   - For front end: create a `.env` file in the `frontend` directory with keys prefixed by `REACT_APP_` (e.g., `REACT_APP_API_URL=http://localhost:8000`).

- **Data Files**: Place any necessary data files in the `data` directory, and update paths in `backend/main.py` as needed.

---

## Notes

1. **Testing**: Ensure both front-end and back-end are running for the application to work as expected.
2. **Deployment**: For production, consider using Docker to containerize the front end and back end or deploying to a cloud service like Heroku, AWS, or Google Cloud.

---

This README should provide you with all the steps to set up, configure, and run your Weather Report Prediction project. Enjoy working on your project!



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
