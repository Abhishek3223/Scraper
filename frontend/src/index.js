import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const spinner = document.getElementById('spinner');

// Hide the spinner initially
spinner.style.display = 'none';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Show the spinner while React is loading
spinner.style.display = 'block';

// Hide the spinner and render data after a 3-second buffer time
setTimeout(() => {
  spinner.style.display = 'none';
  // Render the data or perform any other action here
}, 3000);

// Example of rendering the data after the buffer time
setTimeout(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 3000);

// You can also call the reportWebVitals function after the buffer time
setTimeout(() => {
  reportWebVitals();
}, 3000);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// You can also call the reportWebVitals function after the buffer time
// setTimeout(() => {
//   reportWebVitals();
// }, 3000);
