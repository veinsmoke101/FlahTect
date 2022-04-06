import React from 'react';
import classes from "./LoginForm.module.scss";
import AuthForm from "./AuthForm";
import {useNavigate} from "react-router-dom";

const ClientRegisterForm = () => {

    const navigate = useNavigate()


    const handleClientRegister = (event) => {
        event.preventDefault();
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
            fetch('http://127.0.0.1:2001/api/register', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.json()).then((account) => {
                alert(`Account created successfully here is your unique reference .. PLEASE SAVE IT CAREFULLY
                \n${account.data.clientRef}`)
                navigate("/login")
                console.log(data)
            }).catch(() => alert('Something went wrong'))

        }
    }

    return (
        <section className={classes.adminLoginContainer}>
            <div className={`${classes.formContainer} ${classes.registerFormContainer}`}>
                <AuthForm onSubmit={handleClientRegister} title={"Client Log in"}>
                    <input className={classes.input} type="text" placeholder={"Firstname"} name={"firstname"}/>
                    <input className={classes.input} type="text" placeholder={"Lastname"} name={"lastname"}/>
                    <input className={classes.input} type="number" placeholder={"Age"} name={"age"}/>
                    <input className={classes.input} type="text" placeholder={"Profession"} name={"profession"}/>
                </AuthForm>
            </div>
            <div className={`${classes.leftSideSection} ${classes.sideSection}`}>
                <h1 className={classes.title}>Welcome dear !</h1>
                <p className={classes.body}>Create your account and
                    pick an appointment and we gonna take care of everything for you
                </p>
            </div>
        </section>
    );
};

export default ClientRegisterForm;