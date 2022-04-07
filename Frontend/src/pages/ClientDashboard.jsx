import DashboardLayout from "../Layouts/DashboardLayout";
import {useContext, useEffect, useMemo} from "react";
import {useState} from "react";
import Table from "../components/Dashboard/Table";
import AddRDV from "../components/Dashboard/Client/AddRDV";
import UpdateRDV from "../components/Dashboard/Client/UpdateRDV";
import {AuthContext} from "../contexts/UserAuthContext";

const ClientDashboard = () => {

    const {loggedClientRef, loggedClientId} = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)
    const [rdvData, setRdvData] = useState([])

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("clientRef", loggedClientRef);
        fetch(`http://127.0.0.1:2001/api/rdvs?client_id=${loggedClientId}`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'

        }).then(response => response.json())
            .then(json => {
                setIsLoading(false)
                setRdvData(json.data)
                console.log(json.data)
            })
    }, [])


    const columns = useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Time',
                accessor: 'time_slot',
            }
            ,
            {
                Header: 'Subject',
                accessor: 'description',
            }

        ],
        []
    )


    const [formToggle, setFormToggle] = useState(true)

    const addHandler = () => {
        setFormToggle(true)
    }
    const updateHandler = () => {
        setFormToggle(false)
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>

            <DashboardLayout>
                {formToggle ? <AddRDV/> : <UpdateRDV/>}
                <Table instance={"rdv"} onAdd={addHandler} onUpdate={updateHandler} columns={columns} data={rdvData}/>
            </DashboardLayout>

        </div>
    );
};

export default ClientDashboard;