import React, {useContext, useEffect} from 'react';
import AuthLayout from "../Layouts/AuthLayout";
import AdminLoginForm from "../components/Authentification/AdminLoginForm";
import {AdminContext} from "../contexts/AdminAuthContext";
import {useLocation, useNavigate} from "react-router-dom";

const AdminLogin = () => {



    return (
        <AuthLayout>
            <AdminLoginForm/>
        </AuthLayout>
    );
};

export default AdminLogin;