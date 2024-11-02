import React, { useEffect, useState } from 'react';
import { get_models } from '../api.js';

function Models() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const data = await get_models();
            setModels(data.models);
        };
        fetchModels();
    }, []);

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
