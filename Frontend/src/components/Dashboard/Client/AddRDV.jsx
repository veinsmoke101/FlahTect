import React, {useContext} from 'react';
import RDVForm from "./RDVForm";
import {RDVContext} from "../../../contexts/rdvDatacontext";
import {AuthContext} from "../../../contexts/UserAuthContext";

const AddRdv = () => {

    const {clientId} = useContext(RDVContext)
    const {loggedClientRef} = useContext(AuthContext)

    const addSubmitHandler = (event) => {
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


        if (error === 'age') {
            document.getElementById('error').innerText = "Invalid Age"
        } else if (error === 'empty') {
            document.getElementById('error').innerText = "please fill all the fields"
        } else {
            document.getElementById('error').innerText = ""
            let formData = new FormData(form);
            formData.append('client_id', clientId)
            const data = Object.fromEntries(formData.entries());
            console.log(data)
            let myHeaders = new Headers();
            myHeaders.append("clientRef", loggedClientRef);
            fetch('http://127.0.0.1:2001/api/rdv', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then((data) => {
                    handleFields()
                    alert('RDV added successfully')
                    console.log(data)
                }).catch(() => alert('Something went wrong'))


            function handleFields() {
                inputs.forEach(input => {
                    if (input.type !== 'submit')
                        input.value = "";
                })
            }
        }
    }

    return (
        <RDVForm data={[]} title='Create new appointment' onSubmit={addSubmitHandler}/>
    );
};

export default AddRdv;