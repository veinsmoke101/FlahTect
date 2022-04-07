import React, {useState} from 'react';
import {createContext} from "react";

export const AdminContext = createContext(null)

const AdminAuthContext = ({children}) => {
    const [jwtToken, setJwtToken] = useState("")


    return (
        <AdminContext.Provider value={{jwtToken, setJwtToken}}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminAuthContext;