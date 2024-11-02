import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, weatherDetails } = location.state || {};

  useEffect(() => {
    if (!prediction) {
      navigate('/');
    }
  }, [prediction, navigate]);

  if (!prediction) return null;

  // Format the prediction data for visualization
  const predictionData = [
    {
      name: 'Regression Model',
      value: Math.round(prediction.regression_prediction * 10) / 10,
    },
    {
      name: 'Gradient Boosting',
      value: Math.round(prediction.gradient_boosting_prediction * 10) / 10,
    },
  ];

  const averagePrediction = (prediction.regression_prediction + prediction.gradient_boosting_prediction) / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Weather Details */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Prediction Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-lg font-semibold">{new Date(weatherDetails.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Temperature (°C)</p>
              <p className="text-lg font-semibold">{weatherDetails.temperature}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Humidity (%)</p>
              <p className="text-lg font-semibold">{weatherDetails.humidity}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Solar Exposure (MJ/m²)</p>
              <p className="text-lg font-semibold">{weatherDetails.solarExposure}</p>
            </div>
          </div>
        </div>

        {/* Average Predicted Rainfall Card */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Average Predicted Rainfall</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Predicted Rainfall (mm)</p>
              <p className="text-4xl font-bold text-indigo-600">{Math.round(averagePrediction)} mm</p>
              <p className="text-lg font-medium text-gray-800 mt-2">Based on multiple model predictions</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Cluster Assignment</p>
              <p className="text-2xl font-bold text-indigo-600">Group {prediction.cluster + 1}</p>
            </div>
          </div>
        </div>

        {/* Model Predictions Chart */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Model Predictions Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Predicted Rainfall (mm)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" name="Predicted Rainfall (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Make Another Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;

