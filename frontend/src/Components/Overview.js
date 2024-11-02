import React, {useEffect, useState} from 'react'; 
import { getOverview} from '../api.js';  

function Overview() { 
    const [overview, setOverview] = useState(null); 
    const [error, setError] = useState(null);  

    useEffect(() => { 
        const fetchOverview = async () => {  
            try { 
                const data = await getOverview();
                setOverview(data);
                setError(null); // Clear any previous errors
            } catch (error) { 
                console.error('Error fetching overview:', error);
                setError('Failed to load overview. Please try again later.');
            }
        }; 

        fetchOverview();
    }, []);   
    
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!overview) return <div>Loading...</div>;

    return (
        <div>
            <h2>{overview.title}</h2>
            <p>{overview.description}</p>
            <p><strong>Target Users:</strong> {overview.target_users}</p>
        </div>
    );
}


export default Overview;