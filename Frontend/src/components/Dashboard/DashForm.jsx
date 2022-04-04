import React from 'react';
import classes from './DashForm.module.scss'
import client from '../../images/undraw_urban_design_kpu8 1.svg'
import admin from '../../images/undraw_building_re_xfcm.svg'
import Form from '../Form'

const DashForm = (props) => {
    return (
        <section className={classes.form}>
            {/*<form onSubmit={props.onSubmit} >*/}
            {/*    <legend> {props.title} </legend>*/}
            {/*        {props.children}*/}
            {/*    <input className={classes.submit} type="submit" value='submit'/>*/}
            {/*</form>*/}
            <Form onSubmit={props.onSubmit} title={props.title} >
                {props.children}
            </Form>

            <div className={classes.illustration}>
                <img src={props.image === 'client'? client : admin } alt="illustration"/>
            </div>
        </section>

    );
};

export default DashForm;