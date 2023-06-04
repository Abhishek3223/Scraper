import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const spinner = document.getElementById('spinner');

// Hide the spinner initially
spinner.style.display = 'none';

// Show the spinner while waiting
spinner.style.display = 'flex';

// Wait for 3 seconds before re-rendering the App component
setTimeout(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // Hide the spinner after rendering the App component
  spinner.style.display = 'none';
}, 3000);

// Call the reportWebVitals function after the waiting time
setTimeout(() => {
  reportWebVitals();
}, 3000);
