import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from "swr";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import useFetch from "hooks/useFetch";
import UserContextProvider from "context/UserContext";
import { REACT_API_URL } from "configurations/api";
import App from './App';

axios.defaults.baseURL = REACT_API_URL;

const { fetchGetWithToken } = useFetch();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <SWRConfig value={{ fetcher: fetchGetWithToken }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
