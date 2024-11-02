import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        temperature,
        humidity
      });

      // Navigate to Results page with data
      navigate('/results', { state: response.data });

    } catch (error) {
      console.error('Error making prediction:', error);
      alert('Error making prediction. Please try again.');
    }
  };

  return (
    <div>
      <h1>Weather Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Temperature:
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Humidity:
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
    </div>
  );
};

export default Home;
