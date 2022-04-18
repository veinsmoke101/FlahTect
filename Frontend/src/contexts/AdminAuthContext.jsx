import React, {useState} from 'react';
import {createContext} from "react";

export const AdminContext = createContext(null)

const AdminAuthContext = ({children}) => {
    let token = ""
    if(localStorage.getItem('adminToken')){
        token = localStorage.getItem('adminToken')
    }
    const [jwtToken, setJwtToken] = useState(token)


    return (
        <AdminContext.Provider value={{jwtToken, setJwtToken}}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminAuthContext;