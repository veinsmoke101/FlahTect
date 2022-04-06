import React, {useContext} from 'react';
import {RDVContext} from "../../../contexts/rdvDatacontext";

const TimeSlots = () => {

    const allTimeSlots = [
        '10h to 10:30h',
        '11h to 11:30h',
        '14h to 14:30h',
        '15h to 15:30h',
        '16h to 16:30h'
    ]

    const allTimeSlotsValue = [1, 2, 3, 4, 5]

    const {
        time, setTime,
        occupiedTimeSlots
    } = useContext(RDVContext)

    const availableTimeSlots = allTimeSlotsValue.filter((timeSlot) => {
        return !occupiedTimeSlots.includes(timeSlot)
    })

    console.log(availableTimeSlots)

    const selectHandler = () => {
        const timeOption = document.getElementById('timePlaceHolder');
        if(timeOption)
            timeOption.remove();
    }

    const options = availableTimeSlots.map((timeSlot)=> {
            return <option key={timeSlot} value={timeSlot}>{allTimeSlots[timeSlot-1]}</option>
        })

    return (
        <select onClick={selectHandler} value={time} onChange={(e => setTime(e.target.value))} name="time_slot" id="time">
            <option id={"timePlaceHolder"} value="0">Time</option>
            {options}
        </select>
    );
};

export default TimeSlots;