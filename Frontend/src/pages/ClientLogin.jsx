import React, {useContext} from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import ClientLoginForm from "../components/Authentification/ClientLoginForm";
import {AdminContext} from "../contexts/AdminAuthContext";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/UserAuthContext";


const ClientLogin = () => {


    return (
        <AuthLayout>
            <ClientLoginForm/>
        </AuthLayout>
    );
};

export default ClientLogin;