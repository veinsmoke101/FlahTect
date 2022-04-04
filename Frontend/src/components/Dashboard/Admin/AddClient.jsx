import ClientForm from "./ClientForm";

const AddClient = () => {

    const addSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Add')
    }

    return (
        <ClientForm data={[]} title='Create new Client' onSubmit={addSubmitHandler} />
    );
};

export default AddClient;