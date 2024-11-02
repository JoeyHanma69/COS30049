import React, {useEffect, useState} from 'react'; 
import { getOverview} from '../api.js';  

function Overview() { 
    const [overview, setOverview] = useState(null) 
    useEffect(() => { 
        const fetchOverview = async () => { 
            const data = await getOverview(); 
            setOverview(data);
        }; 
        fetchOverview();
    }, []); 
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