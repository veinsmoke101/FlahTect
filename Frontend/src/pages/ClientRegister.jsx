import React, {useContext} from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import ClientRegisterForm from "../components/Authentification/ClientRegisterForm";
import {AuthContext} from "../contexts/UserAuthContext";
import {useNavigate} from "react-router-dom";


const ClientRegister = () => {

    const {loggedClientId} = useContext(AuthContext)
    const navigate = useNavigate()

    if(loggedClientId !== ""){
        navigate('/client-dashboard')
    }

    return (
        <AuthLayout>
            <ClientRegisterForm/>
        </AuthLayout>
    );
};

export default ClientRegister;