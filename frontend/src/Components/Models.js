import React, { useEffect, useState } from 'react';
import { get_models } from '../api.js';

function Models() {
    const [models, setModels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await get_models();
                setModels(data.models);
                setError(null); // Clear previous errors if any
            } catch (err) {
                console.error('Error fetching models:', err);
                setError('Failed to load models. Please try again later.');
            }
        };
        fetchModels();
    }, []);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!models.length) return <div>Loading...</div>;

    return (
        <div>
            <h2>Machine Learning Models Used</h2>
            <ul>
                {models.map((model, index) => (
                    <li key={index}>
                        <strong>{model.name}</strong> ({model.type}): {model.use_case}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Models;

