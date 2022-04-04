import React from 'react';
import classes from './Form.module.scss'
import illustration from '../../images/undraw_urban_design_kpu8 1.svg'

const Form = (props) => {
    return (
        <section className={classes.form}>
            <form onSubmit={props.onSubmit} >
                <legend> {props.title} </legend>
                {props.children}
                <input className={classes.submit} type="submit" value='submit'/>
            </form>
            <div className={classes.illustration}>
                <img src={illustration} alt="illustration"/>
            </div>
        </section>

    );
};

export default Form;