import React, {useContext} from 'react';
import {Outlet, Navigate, useLocation} from "react-router-dom"
import {AuthContext} from "../../contexts/UserAuthContext";


const ProtectedRoutes = () => {
    const location = useLocation()
    const {loggedClientId} = useContext(AuthContext)
    const isAuth = () => {
        return loggedClientId !== "";
    }
    return isAuth() ? (<Outlet/>) : (<Navigate to={"/"} replace state={{from: location}}/>)
};

export default ProtectedRoutes;

