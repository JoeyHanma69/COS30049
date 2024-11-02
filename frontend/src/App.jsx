import React from 'react';
import Overview from './Components/Overview.js';
import Features from './Components/Features.js';
import Models from './Components/Models.js';
import PredictionForm from './Components/PredictionModels.js';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Report Prediction Platform</h1>
                <Overview />
                <Features />
                <Models />
                <PredictionForm />
            </header>
        </div>
    );
}

export default App;



