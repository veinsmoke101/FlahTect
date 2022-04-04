import React from 'react';
import ClientForm from "./ClientForm";

const UpdateClient = () => {

    const updateSubmitHandler = () => {
        console.log('update')
    }

    const data = ['taha', 'ma a7laha', 44, 'wili wili']
    return (
        <ClientForm data={data} title='Update client informations' onSubmit={updateSubmitHandler} />
    );
};

export default UpdateClient;