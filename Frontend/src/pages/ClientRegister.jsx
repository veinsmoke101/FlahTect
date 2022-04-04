import React from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import ClientRegisterForm from "../components/Authentification/ClientRegisterForm";


const ClientRegister = () => {
    return (
        <AuthLayout>
            <ClientRegisterForm/>
        </AuthLayout>
    );
};

export default ClientRegister;