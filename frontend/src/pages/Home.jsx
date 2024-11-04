import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    humidity: 32.0,
    temperature: 32.0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // console.log( formData.date);

    try { 
        // const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';  
      const API_URL = 'http://127.0.0.1:8000'

      const response = await axios.post(`${API_URL}/predict`, formData);
      console.log(response.data)


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      navigate('/results', { state: { prediction: data, weatherDetails: formData } });
    } 
    
    catch (error) {
      console.error('Error making prediction:', error);
      setError('Failed to get prediction. Please try again.');
    } 
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>
            Weather Prediction
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="date">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="temperature">
                Temperature (Â°C)
              </label>
              <input
                id="temperature"
                name="temperature"
                type="number"
                required
                value={formData.temperature}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="humidity">
                Humidity (%)
              </label>
              <input
                id="humidity"
                name="humidity"
                type="number"
                required
                value={formData.humidity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div>
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Weather'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

