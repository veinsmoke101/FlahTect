import React, {useMemo, useState} from 'react';
import {createContext} from "react";

export const AuthContext = createContext(null)

const UserAuthContext = ({children}) => {

    let clientId = ""
    let clientRef = ""
    if (localStorage.getItem('clientId')) {
        clientId = localStorage.getItem('clientId')
        clientRef = localStorage.getItem('clientRef')
    }

    const [state, setState] = useState({
        loggedClientId: clientId,
        loggedClientRef: clientRef,
        loggedFirstname: "",
        loggedLastname: "",
        loggedAge: "",
        loggedProfession: "",
    })

    const stateWithSetters = useMemo(() => {
        const obj = {};
        Object.keys(state).forEach(key => {
            obj[key] = state[key];
            const setterName = key[0].toUpperCase() + key.slice(1);
            obj[`set${setterName}`] = (val) => {
                setState(v => ({...v, [key]: typeof val === "function" ? val(v[key]) : val}))
            }
        })
        return obj;
    }, [state])


    return (
        <AuthContext.Provider value={{...stateWithSetters}}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserAuthContext;