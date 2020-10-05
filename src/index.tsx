import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from "swr";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import useFetch from "hooks/useFetch";
import { UserContextProvider } from "context/UserContext";
import App from './App';

axios.defaults.baseURL = "https://4000-e86ba1c6-afb0-4af4-ab67-4a8ff33a5cf2.ws-us02.gitpod.io";

const { fetchGetWithToken } = useFetch();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <SWRConfig value={{fetcher: fetchGetWithToken}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
