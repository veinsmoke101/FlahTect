import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import ClientDataContext from "./contexts/clientDataContext";
import RdvDataContext from "./contexts/rdvDatacontext";

ReactDOM.render(
    <BrowserRouter>
        <ClientDataContext>
            <RdvDataContext>
                <App />
            </RdvDataContext>
        </ClientDataContext>
    </BrowserRouter>
  ,
  document.getElementById('root')
)
