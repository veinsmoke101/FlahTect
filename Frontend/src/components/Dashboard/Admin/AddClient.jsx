import ClientForm from "./ClientForm";

const AddClient = () => {

    const addSubmitHandler = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const inputs = form.querySelectorAll('input');
        let bool = true;
        inputs.forEach(input => {
            if(!input.value){
                bool = false;
            }
        })
        if(!bool){
            document.getElementById('error').innerText = "please fill all the fields"
        }else{
            document.getElementById('error').innerText = ""
            let formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch('http://127.0.0.1:2001/api/client',{
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.text()).then((data) => console.log(data))

            function clearFields(){

            }
        }
    }

    return (
        <ClientForm data={['','','','']} title='Create new Client' onSubmit={addSubmitHandler} />
    );
};

export default AddClient;