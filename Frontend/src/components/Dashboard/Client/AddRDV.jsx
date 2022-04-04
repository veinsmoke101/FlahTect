import React from 'react';
import ClientForm from "../Admin/ClientForm";
import RDVForm from "./RDVForm";

const AddRdv = () => {
    const addSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Add appointment')
    }

    return (
        <RDVForm data={[]} title='Create new appointment' onSubmit={addSubmitHandler} />
    );
};

export default AddRdv;