import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import InputForm from './Components/InputForm.jsx'; 
import ErrorAlert from './Components/ErrorAlert.jsx'; 
import DisplayResults from './Components/DisplayResults.jsx'; 
import { classifyWeather, regressWeather } from './api.js';

function App() {
  const [count, setCount] = useState(0); 
  const [error, setError] = useState(''); 
  const [result, setResult] = useState(''); 

  const handlePrediction = async (inputData, type) => { 
    try { 
      let prediction; 
      if (type === 'classification') { 
        prediction = await classifyWeather(inputData);
      } else { 
        prediction = await regressWeather(inputData);
      } 
      setResult(`Prediction (${type}): ${prediction}`); 
      setError('');
    } catch (err) { 
      setError(err.message); 
      setResult('');
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Weather Report Prediction</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>  

      {/* Weather Prediction Components */}
      <InputForm setError={setError} setResult={setResult} /> {/* Correctly passing setError and setResult */}
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DisplayResults result={result} />
    </>
  )
}

export default App;


