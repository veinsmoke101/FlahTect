import React, { useState} from 'react';
import Form from "../Form";
import classes from './ClientForm.module.scss'

const ClientForm = (props) => {
    const fields = ['firstname', 'lastname', 'age', 'profession']
    let inputs;

    const [firstname, setFirstname]     = useState(props.data[0])
    const [lastname, setLastname]       = useState(props.data[1])
    const [age, setAge]                 = useState(props.data[2])
    const [profession, setProfession]   = useState(props.data[3])



    return (
        <Form title={props.title} onSubmit={props.onSubmit} >
            <div className={classes.name}>
                <input className={`${classes.input} ${classes.firstname}`}  type={'text'} value={firstname} onChange={(e => setFirstname(e.target.value))} placeholder={'firstname'} name={'firstname'}/>
                <input className={classes.input}  type={'text'} value={lastname} onChange={(e => setLastname(e.target.value))} placeholder={'lastname'} name={'lastname'}/>
            </div>
            <input className={classes.input}  type={'number'} value={age} onChange={(e => setAge(e.target.value))} placeholder={'age'} name={'age'}/>
            <input className={classes.input}  type={'text'} value={profession} onChange={(e => setProfession(e.target.value))} placeholder={'profession'} name={'profession'}/>
        </Form>
    );
};

export default ClientForm;