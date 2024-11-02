import React from 'react'; 


const Results = ({ predictionData }) => { 
    if (!predictionData) {
        return <div>No prediction data available.</div>;
      } 
      return (
        <div>
          <h1>Prediction Results</h1>
          <p>{`Will it rain: ${predictionData.will_rain ? 'Yes' : 'No'}`}</p>
          {predictionData.graph && (
            <div>
              <h3>Prediction Graph</h3>
              <img src={`http://localhost:8000/${predictionData.graph}`} alt="Prediction Graph" />
            </div>
          )}
        </div>
      );
}; 

export default Results;