import React from 'react';
import Form from '../Form'


const AuthForm = (props) => {
    return (

            <Form onSubmit={props.onSubmit} title={props.title} >
                {props.children}
            </Form>

    );
};

export default AuthForm;