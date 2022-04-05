import React from 'react';
import classes from "./From.module.scss";


const Form = (props) => {
    return (
        <form id={"form"} onSubmit={props.onSubmit} >
            <legend> {props.title} </legend>
            {props.children}
            <div id={'error'}> </div>
            <input className={classes.submit} type="submit" value='submit'/>
        </form>
    );
};

export default Form;