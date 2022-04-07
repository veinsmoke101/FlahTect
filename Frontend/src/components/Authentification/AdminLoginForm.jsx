import React, {useContext} from 'react';
import AuthForm from "./AuthForm";
import classes from "./LoginForm.module.scss"
import {useLocation, useNavigate} from "react-router-dom";
import {AdminContext} from "../../contexts/AdminAuthContext";


const AdminLoginForm = () => {

    const {setJwtToken} = useContext(AdminContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleAdminLogin = (event) => {
        event.preventDefault()
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');

        let error = '';
        inputs.forEach(input => {
            if (!input.value) {
                error = 'empty';
            }
        })

        if (error === 'empty') {
            document.getElementById('error').innerText = "please fill all the fields"
        } else {
            document.getElementById('error').innerText = ""
            let formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data)
            fetch('http://127.0.0.1:2001/api/login/admin', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.json()).then((admin) => {
                setJwtToken(admin.jwt)
                if (location.state?.from) {
                    navigate(location.state.from)
                } else {
                    navigate("/admin-dashboard")
                }

                console.log(data)
            }).catch(() => alert('Something went wrong'))

        }
    }

    return (
        <section className={classes.adminLoginContainer}>
            <div className={classes.formContainer}>
                <AuthForm onSubmit={handleAdminLogin} title={"Admin Log in"}>
                    <input className={classes.input} type="text" placeholder={"username"} name={"username"}/>
                    <input className={classes.input} type="password" placeholder={"password"} name={"password"}/>
                </AuthForm>
            </div>
            <div className={classes.sideSection}>
                <h1 className={classes.title}>Welcome dear Admin !</h1>
                <p className={classes.body}>Log in your account and pick an
                    appointment and we gonna take care of everything for you
                </p>
            </div>
        </section>
    );
};

export default AdminLoginForm;