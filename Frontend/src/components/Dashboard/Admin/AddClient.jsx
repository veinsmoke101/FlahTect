import ClientForm from "./ClientForm";
import {useContext, useEffect} from "react";
import {ClientContext} from "../../../contexts/clientDataContext";

const AddClient = () => {

    const {
        setFirstname,
        setLastname,
        setAge,
        setProfession
    } = useContext(ClientContext)

    useEffect(() => {
        setFirstname('')
        setLastname('')
        setAge('')
        setProfession('')
    },[])

    const addSubmitHandler = (event) => {
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
            const data = Object.fromEntries(formData.entries());

            fetch('http://127.0.0.1:2001/api/client',{
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.text()).then((data) => {
                handleFields()
                alert('client added successfully')
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

    return (
        <ClientForm data={['','','','']} title='Create new Client' onSubmit={addSubmitHandler} />
    );
};

export default AddClient;