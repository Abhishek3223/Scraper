import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const spinner = document.getElementById('spinner');

// Hide the spinner initially
spinner.style.display = 'none';

// Show the spinner while waiting
spinner.style.display = 'flex';

// Wait for 3 seconds before re-rendering the App component
setTimeout(() => {
  ReactDOM.render(
    
    // <GoogleOAuthProvider clientId="584287146544-epq7cmsb7tdp48jdmn80d1m808t50cuc.apps.googleusercontent.com">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    // </GoogleOAuthProvider>
    ,

    document.getElementById('root')
  );

  // Hide the spinner after rendering the App component
  spinner.style.display = 'none';
}, 3000);

// Call the reportWebVitals function after the waiting time
setTimeout(() => {
  reportWebVitals();
}, 3000);
