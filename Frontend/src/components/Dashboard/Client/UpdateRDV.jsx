import React from 'react';
import RDVForm from './RDVForm'

const UpdateRdv = () => {
    const updateSubmitHandler = () => {
        console.log('update appointment')
    }

    const data = [
        '12/05/2021',
        '10:00 - 10:30',
        'Loren ipsum lombardi heno garda hselo debago del filal...'
    ]

    return (
        <RDVForm data={data} title='Update client informations' onSubmit={updateSubmitHandler} />
    );
};

export default UpdateRdv;