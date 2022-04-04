import React from 'react';
import AuthForm from "./AuthForm";
import classes from "./LoginForm.module.scss"

const AdminLoginForm = (props) => {
    return (
        <section className={classes.adminLoginContainer}>
            <div className={classes.formContainer}>
                <AuthForm onSubmit={props.onSubmit} title={"Admin Log in"}>
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