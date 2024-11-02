import React from 'react';
import Overview from './Components/Overview.js';
import PredictionForm from './Components/PredictionModels.js';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Report Prediction Platform</h1>
                <Overview />
                <PredictionForm />
            </header>
        </div>
    );
}

export default App;



