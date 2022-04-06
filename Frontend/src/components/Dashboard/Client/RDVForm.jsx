import React, {useContext, useEffect} from 'react';
import DashForm from "../DashForm";
import classes from './RDVForm.module.scss'
import {RDVContext} from "../../../contexts/rdvDatacontext";
import TimeSlots from "./TimeSlots";

const RDVForm = (props) => {


    const {
        date, setDate,
        description, setDescription,
        setOccupiedTimeSlots
    } = useContext(RDVContext)


    useEffect(() => {
        if (!date) return;
        fetch(`http://127.0.0.1:2001/api/rdvs/timeslots?date=${date}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setOccupiedTimeSlots(data.data);
            })
    }, [date])


    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    return (
        <DashForm image={"client"} title={props.title} onSubmit={props.onSubmit}>
            <div className={classes.timeWrapper}>
                <input min={new Date().toJSON().slice(0, 10)} id={"date"} className={`${classes.input} ${classes.date}`}
                       type={'date'} value={date} onChange={handleDateChange} placeholder={'date'} name={'date'}/>
                <TimeSlots/>
            </div>
            <input className={classes.input} type={'text'} value={description}
                   onChange={(e => setDescription(e.target.value))} placeholder={'subject'} name={'description'}/>
        </DashForm>
    );
};

export default RDVForm;