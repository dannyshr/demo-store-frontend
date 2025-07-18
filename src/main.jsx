// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import your Redux store from the new file
import App from './App'; // Import your App component
import './index.css'; // Or wherever your global CSS is, e.g., './App.css'

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your App component with the different Providers and pass their instances */}
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
