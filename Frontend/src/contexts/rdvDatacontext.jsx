import React, {createContext, useMemo, useState} from 'react';



export const RDVContext = createContext(null);


const RdvDataContext = ({children}) => {

    const [state, setState] = useState({
        rdvId: 0,
        clientId: 2,
        date: "",
        time: 0,
        description: "",
    })
    const [occupiedTimeSlots, setOccupiedTimeSlots]   = useState([])

    const stateWithSetters = useMemo(() => {
        const obj = {};
        Object.keys(state).forEach(key => {
            obj[key] = state[key];
            const setterName = key[0].toUpperCase() + key.slice(1);
            obj[`set${setterName}`] = (val) => {
                setState(v => ({...v, [key]: typeof val === "function" ? val(v[key]) : val}))
            }
        })
        return obj;
    }, [state])

    console.log(stateWithSetters);
    return (
        <RDVContext.Provider value={{
            ...stateWithSetters,
            occupiedTimeSlots, setOccupiedTimeSlots
        }}>
            {children}
        </RDVContext.Provider>
    );
};

export default RdvDataContext;