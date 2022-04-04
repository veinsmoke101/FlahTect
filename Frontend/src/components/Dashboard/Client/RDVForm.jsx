import React, { useState} from 'react';
import DashForm from "../DashForm";
import classes from './RDVForm.module.scss'

const RDVForm = (props) => {
    const fields = ['date', 'time', 'subject']
    let inputs;

    const [date, setDate]     = useState(props.data[0])
    const [time, setTime]       = useState(props.data[1])
    const [subject, setSubject]   = useState(props.data[2])

    function click(){
        const timeOption = document.getElementById('date');
        timeOption.remove();
    }

    return (
        <DashForm image={"client"} title={props.title} onSubmit={props.onSubmit} >
            <div className={classes.timeWrapper}>
                <input className={`${classes.input} ${classes.date}`}  type={'date'} value={date} onChange={(e => setDate(e.target.value))} placeholder={'date'} name={'date'}/>
                <select onClick={click} name="time" id="time">
                    <option id={"date"} value="">Date</option>
                    <option value="1">10h to 10:30h</option>
                    <option value="2">11h to 11:30h</option>
                    <option value="3">14h to 14:30h</option>
                    <option value="4">15h to 15:30h</option>
                    <option value="5">16h to 16:30h</option>
                </select>
            </div>
            <input className={classes.input}  type={'text'} value={subject} onChange={(e => setSubject(e.target.value))} placeholder={'subject'} name={'subject'}/>
        </DashForm>
    );
};

export default RDVForm;