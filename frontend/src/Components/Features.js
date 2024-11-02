import React, { useEffect, useState } from 'react';
import { get_features } from '../api.js';

function Features() {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const data = await get_features();
            setFeatures(data.features);
        };
        fetchFeatures();
    }, []);

    return (
        <div>
            <h2>Platform Features</h2>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
}

export default Features;
