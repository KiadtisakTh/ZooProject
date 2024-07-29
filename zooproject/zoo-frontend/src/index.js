import React from 'react';
import ReactDOM from 'react-dom/client'; // ใช้ ReactDOM จาก react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // ใช้ createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
