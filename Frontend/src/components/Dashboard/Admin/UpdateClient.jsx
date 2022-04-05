import React, {useContext, useEffect, useState} from 'react';
import ClientForm from "./ClientForm";
import { ClientContext } from '../../../contexts/clientDataContext'


const UpdateClient = () => {

    const {
        clientId,
        setFirstname,
        setLastname,
        setAge,
        setProfession
    } = useContext(ClientContext)

    const updateSubmitHandler = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');
        let error = '';
        inputs.forEach(input => {
            if(input.name === 'age' && (input.value < 0 || input.value > 100)){
                error = 'age'
            }
            if(!input.value){
                error = 'empty';
            }
        })

        if(error === 'age'){
            document.getElementById('error').innerText = "Invalid Age"
        }else
        if(error === 'empty'){
            document.getElementById('error').innerText = "please fill all the fields"
        }else{
            document.getElementById('error').innerText = ""
            let formData = new FormData(form);
            formData.append('id', clientId)
            const data = Object.fromEntries(formData.entries());
            console.log(JSON.stringify(data))
            fetch('http://127.0.0.1:2001/api/client',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.text()).then((data) => {
                handleFields()
                alert('client updated successfully')
                console.log(data)
            }).catch(() => alert('Something went wrong'))



            function handleFields(){
                inputs.forEach(input => {
                    if(input.type !== 'submit')
                        input.value = "";
                })
            }
        }
    }

    const [client, setClient] = useState({})

    useEffect(() => {
            fetch('http://127.0.0.1:2001/api/client?id=' + clientId,{
                method: 'GET'
            })
                .then(res => res.json())
                .then((data) => {
                    setClient(data.data);
                    console.log(Object.values(client))
                    setFirstname(data.data.firstname)
                    setLastname(data.data.lastname)
                    setAge(data.data.age)
                    setProfession(data.data.profession)
                })
            },
        [clientId])

    let data ;
    if(Object.keys(client).length === 0) {
        data = ['test','test',4,'test']
    }else{
        data = Object.values(client)
        console.log('else')
    }

    console.log(data)

    return (
        <ClientForm data={data} title='Update client informations' onSubmit={updateSubmitHandler} />
    );
};

export default UpdateClient;