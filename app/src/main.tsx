import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';

// Typage TypeScript pour s'assurer que getElementById retourne une instance HTMLElement
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
