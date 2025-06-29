import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HashRouter>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </HashRouter>
);
