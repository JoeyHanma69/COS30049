import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // URL of your FastAPI backend

export const getOverview = async () => {
    const response = await axios.get(`${API_BASE_URL}/overview`);
    return response.data;
};

export const getFeatures = async () => {
    const response = await axios.get(`${API_BASE_URL}/features`);
    return response.data;
};

export const getModels = async () => {
    const response = await axios.get(`${API_BASE_URL}/models`);
    return response.data;
};

export const predictRain = async (temperature, humidity) => {
    const response = await axios.post(`${API_BASE_URL}/predict_rain`, {
        temperature,
        humidity,
    });
    return response.data;
};

export const predictRainfall = async (temperature, humidity) => {
    const response = await axios.post(`${API_BASE_URL}/predict_rainfall`, {
        temperature,
        humidity,
    });
    return response.data;
};

export const clusterWeather = async (temperature, rainfall, solarExposure) => {
    const response = await axios.post(`${API_BASE_URL}/cluster_weather`, {
        temperature,
        rainfall,
        solarExposure,
    });
    return response.data;
};

