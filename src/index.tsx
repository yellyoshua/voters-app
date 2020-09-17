import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "context/UserContext";
import App from './App';

axios.defaults.baseURL = "http://iamyell.team:4000";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
