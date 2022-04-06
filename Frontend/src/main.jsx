import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import ClientDataContext from "./contexts/clientDataContext";
import RdvDataContext from "./contexts/rdvDatacontext";
import UserAuthContext from "./contexts/UserAuthContext";

ReactDOM.render(
    <BrowserRouter>
        <ClientDataContext>
            <RdvDataContext>
                <UserAuthContext>
                    <App/>
                </UserAuthContext>
            </RdvDataContext>
        </ClientDataContext>
    </BrowserRouter>
    ,
    document.getElementById('root')
)
