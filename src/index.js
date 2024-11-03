import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
// import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

export const server = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento en tu app, pasa una función para registrar resultados
// (por ejemplo: reportWebVitals(console.log)) o envía a un endpoint de análisis.
// reportWebVitals();


/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/