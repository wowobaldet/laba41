import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Если вам не нужен reportWebVitals, просто удалите эти строки:
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Если удаляете reportWebVitals, эту часть тоже можно удалить:
// reportWebVitals();