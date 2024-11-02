import React, { useState } from 'react'; 
import { classifyWeather, regressWeather } from '../api'; 
  
const InputForm = ({ setError, setResult }) => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
  
    const handleClassify = async () => { 
      try { 
        const prediction = await classifyWeather({ temperature, humidity }); 
        setResult(`Classification: ${prediction}`);
      } catch (err) { 
        setError(err);
      }
    }; 

    const handleRegress = async () => { 
      try { 
        const prediction = await regressWeather({ temperature, humidity }); 
        setResult(`Regression: ${prediction}`);  
      } catch (err) { 
        setError(err);
      }
    };
  
    return (
      <div> 
        <input  
        type="number" 
        placeholder="Temperature"  
        value={temperature}
        onChange={ (e) => setTemperature(e.target.value)}
        /> 
        <input   
        type="number" 
        placeholder="Humidity" 
        value={humidity} 
        onChange={(e) => setHumidity(e.target.value)}
        /> 
        <button onClick={handleClassify}>Classify</button> 
        <button onClick={handleRegress}>Regress</button>
      </div>
    );
  };
  
  export default InputForm;