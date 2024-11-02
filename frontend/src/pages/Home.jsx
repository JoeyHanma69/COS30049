import React from 'react'; 
import { useNavigate } from 'react-router-dom';  
import InputForm from '../Components/PredictionModel.js' 

const Home = ({ setPredictionData }) => { 
    const navigate = useNavigate()

    const handleSubmit = async (inputData) => { 
        try { 
            const response = await fetch('http://127.0.0.1:8000/predict_rain', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(inputData),
            }); 
            const data = await response.json() 
            setPredictionData(data); 
            navigate('/results');
        } catch (err) { 
            console.error('Error fetching prediction: ', err)
        } 
    };  
    
    return (
        <div>
          <h1>Weather Prediction Home Page</h1>
          <InputForm onSubmit={handleSubmit} />
        </div>
      );
}; 

export default Home;
