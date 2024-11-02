import React, { useState } from 'react';
import { predictRain } from '../api.js'; // Ensure correct import with the proper file path

function PredictionForm() {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    // Updated handleSubmit to correctly pass the arguments to the predictRain function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        try {
            // Pass an object with both temperature and humidity
            const result = await predictRain({ temperature: parseFloat(temperature), humidity: parseFloat(humidity) });

            // Set the result (assuming the backend returns a 'will_rain' boolean)
            setPrediction(result ? 'It will rain' : 'It will not rain');
            setError(''); // Clear any previous error messages
        } catch (err) {
            // Set an error message if the prediction fails
            setError('Error making prediction. Please try again later.');
            console.error('Error making prediction:', err);
            setPrediction(''); // Clear any previous predictions
        }
    };

    return (
        <div>
            <h2>Rain Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Humidity"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    required
                />
                <button type="submit">Predict Rain</button>
            </form>
            {prediction && <p>Prediction: {prediction}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PredictionForm;
