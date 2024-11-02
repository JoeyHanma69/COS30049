import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';  // Ensure it matches your backend URL

export const getFeatures = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/features`);
        return response.data;
    } catch (error) {
        console.error('Error fetching features:', error);
        throw error;
    }
};

export const getModels = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/models`);
        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};
