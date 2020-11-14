import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from "swr";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import useFetch from "hooks/useFetch";
import UserContextProvider from "context/UserContext";
import AppContextProvider from "context/AppContext";
import { REACT_API_URL } from "configurations/api";
import App from './App';

axios.defaults.baseURL = REACT_API_URL;

const { fetchGetWithToken } = useFetch();

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <SWRConfig value={{
          fetcher: fetchGetWithToken,
          refreshInterval: 15000,
          revalidateOnReconnect: true
        }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SWRConfig>
      </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
