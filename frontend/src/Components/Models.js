import React, { useEffect, useState } from 'react';
import { getModels } from '../api.js';

function Models() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const data = await getModels();
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
