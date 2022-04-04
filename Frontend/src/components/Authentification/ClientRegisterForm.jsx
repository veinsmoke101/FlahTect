import React from 'react';
import classes from "./LoginForm.module.scss";
import AuthForm from "./AuthForm";

const ClientRegisterForm = (props) => {
    return (
        <section className={classes.adminLoginContainer} >
            <div className={`${classes.formContainer} ${classes.registerFormContainer}`}>
                <AuthForm onSubmit={props.onSubmit} title={"Client Log in"}>
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