import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCeUx/WmFZfVtgdVRMY15bQHFPMyBoS35Rc0VkWX1fcXdXQmdbWEZyVEFd');

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
