import React from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import AdminLoginForm from "../components/Authentification/AdminLoginForm";

const AdminLogin = () => {
    return (
        <AuthLayout>
            <AdminLoginForm/>
        </AuthLayout>
    );
};

export default AdminLogin;