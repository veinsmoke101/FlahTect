import React, {createContext, useState} from 'react';



export const RDVContext = createContext(null);


const RdvDataContext = ({children}) => {

    const [rdvId, setRdvId]         = useState(0)
    const [clientId, setClientId]   = useState(2)
    const [date, setDate]           = useState('')
    const [time, setTime]           = useState('')
    const [description, setDescription]   = useState('')


    return (
        <RDVContext.Provider value={{
            clientId, setClientId,
            rdvId, setRdvId,
            date, setDate,
            time, setTime,
            description, setDescription
        }}>
            {children}
        </RDVContext.Provider>
    );
};

export default RdvDataContext;