import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

// Typage TypeScript pour s'assurer que getElementById retourne une instance HTMLElement
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/persist.js'; 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
</React.StrictMode>
);
