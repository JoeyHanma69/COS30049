import React from 'react';  
import ReactDom from 'react-dom/client'; 
import App from './App.jsx';  
import './index.css'

ReactDom.render( 
    <react.StrictMode> 
        <App/>
    </react.StrictMode>, 
    document.getElementsById('root')
);
