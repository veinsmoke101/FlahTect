import React from 'react';
import AuthForm from "./AuthForm";
import classes from "./LoginForm.module.scss"

const ClientLoginForm = (props) => {
    return (
        <section className={classes.adminLoginContainer}>
            <div className={classes.formContainer}>
                <AuthForm onSubmit={props.onSubmit} title={"Client Log in"}>
                    <input className={classes.input} type="text" placeholder={"Client identifier"} name={"username"}/>
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