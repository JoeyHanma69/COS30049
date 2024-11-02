import React, {useEffect, useState} from 'react'; 
import { get_features, get_models } from '../api.js';  

function Overview() { 
    const [features, setFeatures] = useState(null);  
    const [models, setModels] = useState(null);
    const [error, setError] = useState(null);  

    useEffect(() => { 
        const fetchFeatures = async () => { 
            try { 
                const data = await get_features(); 
                setFeatures(data.features); 
                setError(null);
            } catch (error) { 
                console.error('Error fetching features: ', error); 
                setError('Failed to load features. Please try again later.');
            }
        };  
        const fetchModels = async () => { 
            try { 
                const data = await get_models() 
                setModels(data.models); 
                setError(null);
            } catch (error) { 
                console.error('Error fetching models: ', error) 
                setError('Failed to load features. Please try again later.');
            }
        };
        fetchFeatures(); 
        fetchModels();
    }, []);   

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!!features || !models) return <div>Loading...</div>;

    return (
        <div>
            <h2>Platform Features</h2>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>

            <h2>Machine Learning Models Used</h2>
            <ul>
                {models.map((model, index) => (
                    <li key={index}>{model}</li>
                ))}
            </ul>
        </div>
    );
}


export default Overview;