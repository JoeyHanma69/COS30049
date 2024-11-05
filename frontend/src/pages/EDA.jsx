import React from 'react'; 

const EDAAnalysis = () => { 
    return ( 
        <div className="eda-analysis-container"> 
            <h1 className="eda-title">Exploratory Data Analysis (EDA)</h1> 
            <p className="eda-description">Gain insghts into histocial weather trends at Melbourne Olympic Park</p> 
            <div className="eda-content">
                <img src="../assets/EDAchart1.png" alt="EDA Graph" className="eda-graph" />
                <p className="eda-summary">The EDA section shows data distributions, relationships, and trends between temperature, humidity, and weather conditions.</p>
            </div>
        </div>
    );
};

export default EDAAnalysis;