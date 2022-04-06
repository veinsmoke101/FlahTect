import React, {createContext, useState} from 'react';



export const ClientContext = createContext(null);


const ClientDataContext = ({children}) => {

    const [clientId, setClientId]       = useState(0)
    const [firstname, setFirstname]     = useState('')
    const [lastname, setLastname]       = useState('')
    const [age, setAge]                 = useState(0)
    const [profession, setProfession]   = useState('')
    const [reference, setReference]   = useState('')


    return (
        <ClientContext.Provider value={{
            reference, setReference,
            clientId, setClientId,
            firstname, setFirstname,
            lastname, setLastname,
            age, setAge,
            profession, setProfession
        }}>
                {children}
        </ClientContext.Provider>
    );
};

export default ClientDataContext;