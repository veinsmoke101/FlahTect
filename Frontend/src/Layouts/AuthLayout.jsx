import React from 'react';
import classes from './AuthLayout.module.scss'
import Nav from "./Nav";
const AuthLayout = (props) => {

    const links = ["admin", "register", "login"]

    return (
        <div className={classes.authLayoutContainer}>
            <Nav links={links}/>
            <div className={classes.authContainer}>
                {props.children}
            </div>
        </div>
    );
};

export default AuthLayout;