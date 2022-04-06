import React, {useContext, useEffect} from 'react';
import ClientForm from "./ClientForm";
import {ClientContext} from '../../../contexts/clientDataContext'


const UpdateClient = () => {

    const {
        clientId,
        firstname, setFirstname,
        lastname, setLastname,
        age, setAge,
        profession, setProfession
    } = useContext(ClientContext)

    const updateSubmitHandler = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');
        let error = '';
        inputs.forEach(input => {
            if (input.name === 'age' && (input.value < 0 || input.value > 100)) {
                error = 'age'
            }
            if (!input.value) {
                error = 'empty';
            }
        })

        if (error === 'age') {
            document.getElementById('error').innerText = "Invalid Age"
        } else if (error === 'empty') {
            document.getElementById('error').innerText = "please fill all the fields"
        } else {
            document.getElementById('error').innerText = ""

            const data = {
                id: clientId,
                firstname: firstname,
                lastname: lastname,
                age: age,
                profession: profession
            }

            console.log(JSON.stringify(data))
            fetch('http://127.0.0.1:2001/api/client', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then((data) => {
                handleFields()
                alert('client updated successfully')
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


    useEffect(() => {
            fetch('http://127.0.0.1:2001/api/client?id=' + clientId, {
                method: 'GET'
            })
                .then(res => res.json())
                .then((data) => {
                    setFirstname(data.data.firstname)
                    setLastname(data.data.lastname)
                    setAge(data.data.age)
                    setProfession(data.data.profession)
                })
        },
        [clientId])

    return (
        <ClientForm title='Update client informations' onSubmit={updateSubmitHandler}/>
    );
};

export default UpdateClient;