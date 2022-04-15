import React, {useContext} from 'react';
import AuthForm from "./AuthForm";
import classes from "./LoginForm.module.scss"
import {AuthContext} from "../../contexts/UserAuthContext";
import {useLocation, useNavigate} from "react-router-dom";

const ClientLoginForm = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const {
        setLoggedClientId,
        setLoggedClientRef,
        setLoggedFirstname,
        setLoggedLastname,
        setLoggedAge,
        setLoggedProfession
    } = useContext(AuthContext)

    const handleClientLogin = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const input = form.querySelector('input');

        let error = '';
        if (!input.value) {
            error = 'empty';
        }

        if (error === 'empty') {
            document.getElementById('error').innerText = "please fill all the fields"
        } else {
            document.getElementById('error').innerText = ""
            let formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data)
            fetch('http://127.0.0.1:2001/api/login', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.json()).then((account) => {
                localStorage.setItem('clientId', account.data.id);
                localStorage.setItem('clientRef', account.data.clientRef);
                setLoggedClientId(account.data.id)
                setLoggedClientRef(account.data.clientRef)
                setLoggedFirstname(account.data.firstname)
                setLoggedLastname(account.data.lastname)
                setLoggedAge(account.data.age)
                setLoggedProfession(account.data.profession)
                if (location.state?.from) {
                    navigate(location.state.from)
                } else {
                    navigate("/client-dashboard")
                }

                console.log(data)
            }).catch(() => alert('Something went wrong'))

        }
    }


    return (
        <section className={classes.adminLoginContainer}>
            <div className={classes.formContainer}>
                <AuthForm onSubmit={handleClientLogin} title={"Client Log in"}>
                    <input className={classes.input} type="text" placeholder={"Client identifier"} name={"clientRef"}/>
                </AuthForm>
            </div>
            <div className={classes.sideSection}>
                <h1 className={classes.title}> Hello Dear Client !</h1>
                <p className={classes.body}> All you have to do now is to enter your unique identifier
                </p>
            </div>
        </section>
    );
};


export default ClientLoginForm;