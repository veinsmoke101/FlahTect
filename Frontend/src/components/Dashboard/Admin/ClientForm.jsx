import React, {useContext} from 'react';
import DashForm from "../DashForm";
import classes from './ClientForm.module.scss'
import {ClientContext} from "../../../contexts/clientDataContext";


const ClientForm = (props) => {
    console.log('taha')

    const {
        firstname, setFirstname,
        lastname, setLastname,
        age, setAge,
        profession, setProfession
    } = useContext(ClientContext)

    return (
        <DashForm image={"admin"} title={props.title} onSubmit={props.onSubmit}>
            <div className={classes.name}>
                <input className={`${classes.input} ${classes.firstname}`} type={'text'} value={firstname}
                       onChange={(e => setFirstname(e.target.value))} placeholder={'firstname'} name={'firstname'}/>
                <input className={classes.input} type={'text'} value={lastname}
                       onChange={(e => setLastname(e.target.value))} placeholder={'lastname'} name={'lastname'}/>
            </div>
            <input className={classes.input} type={'number'} value={age} onChange={(e => setAge(e.target.value))}
                   placeholder={'age'} name={'age'}/>
            <input className={classes.input} type={'text'} value={profession}
                   onChange={(e => setProfession(e.target.value))} placeholder={'profession'} name={'profession'}/>
        </DashForm>
    );
};

export default ClientForm;