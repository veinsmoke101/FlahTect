import ClientForm from "./ClientForm";
import {useContext, useEffect} from "react";
import {ClientContext} from "../../../contexts/clientDataContext";
import {AdminContext} from "../../../contexts/AdminAuthContext";

const AddClient = () => {

    const {
        setFirstname,
        setLastname,
        setAge,
        setProfession
    } = useContext(ClientContext)

    const {jwtToken} = useContext(AdminContext)


    useEffect(() => {
        setFirstname('')
        setLastname('')
        setAge('')
        setProfession('')
    }, [])

    const addSubmitHandler = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');
        let error = '';
        inputs.forEach(input => {
            if (input.name === 'age' && (input.value < 18 || input.value > 100)) {
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
            let formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            let myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${jwtToken}`)
            fetch('http://127.0.0.1:2001/api/client', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data)
            }).then(response => response.text()).then((data) => {
                handleFields()
                alert('client added successfully')
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
        <ClientForm title='Create new Client' onSubmit={addSubmitHandler}/>
    );
};

export default AddClient;