import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals'
import AuthProvider from './context/authcontext.tsx'
import {QueryProvider} from './react-query/queryProvider.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
    <QueryProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </QueryProvider>
    </BrowserRouter>
  //</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

