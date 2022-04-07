import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import ClientDataContext from "./contexts/clientDataContext";
import RdvDataContext from "./contexts/rdvDatacontext";
import UserAuthContext from "./contexts/UserAuthContext";
import AdminAuthContext from "./contexts/AdminAuthContext";

ReactDOM.render(
    <BrowserRouter>
        <ClientDataContext>
            <RdvDataContext>
                <AdminAuthContext>
                    <UserAuthContext>
                        <App/>
                    </UserAuthContext>
                </AdminAuthContext>
            </RdvDataContext>
        </ClientDataContext>
    </BrowserRouter>
    ,
    document.getElementById('root')
)
