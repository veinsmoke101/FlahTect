import React from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import ClientLoginForm from "../components/Authentification/ClientLoginForm";


const ClientLogin = () => {
    return (
        <AuthLayout>
            <ClientLoginForm/>
        </AuthLayout>
    );
};

export default ClientLogin;