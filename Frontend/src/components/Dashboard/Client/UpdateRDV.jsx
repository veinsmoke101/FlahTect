import React, {useContext, useEffect} from 'react';
import RDVForm from './RDVForm'
import {RDVContext} from "../../../contexts/rdvDatacontext";

const UpdateRdv = () => {

    const {
        clientId,
        rdvId,
        date, setDate,
        time, setTime,
        description, setDescription
    } = useContext(RDVContext)


    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');
        const timeOption = document.getElementById('timePlaceHolder')

        let error = '';
        inputs.forEach(input => {
            if (!input.value || timeOption) {
                error = 'empty';
            }
        })

        if (error === 'empty') {
            document.getElementById('error').innerText = "please fill all the fields"
        } else {
            document.getElementById('error').innerText = ""

            const data = {
                id: rdvId,
                client_id: clientId,
                date: date,
                time_slot: parseInt(time),
                description: description
            }

            console.log(JSON.stringify(data))
            fetch('http://127.0.0.1:2001/api/rdv/update', {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                })
                .then((data) => {
                    handleFields()
                    alert('rdv updated successfully')
                    console.log(data)
                })
                .catch(() => alert('Something went wrong'))


            function handleFields() {
                inputs.forEach(input => {
                    if (input.type !== 'submit')
                        input.value = "";
                })
            }
        }
    }

    useEffect(() => {
            console.log(rdvId)
            fetch('http://127.0.0.1:2001/api/rdv?id=' + rdvId, {
                method: 'GET'
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data.data.time_slot)
                    setDate(data.data.date)
                    setTime(data.data.time_slot)
                    setDescription(data.data.description)
                })
        },
        [rdvId])


    return (
        <RDVForm title='Update client informations' onSubmit={handleUpdateSubmit}/>
    );
};

export default UpdateRdv;