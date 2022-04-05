import DashboardLayout from "../Layouts/DashboardLayout";
import MOCK_DATA from "../components/MOCK_DATA.json";
import {useMemo, useState, useEffect} from "react";
import Table from "../components/Dashboard/Table";
import AddClient from "../components/Dashboard/Admin/AddClient";
import UpdateClient from "../components/Dashboard/Admin/UpdateClient";


const AdminDashboard = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [clientsData, setClientsData] = useState([])



    const columns = useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Firstname',
                accessor: 'firstname',
            },
            {
                Header: 'Lastname',
                accessor: 'lastname',
            }
            ,
            {
                Header: 'Profession',
                accessor: 'profession',
            },
            {
                Header: 'Age',
                accessor: 'age',
            }

        ],
        []
    )

    useEffect(() => {
        fetch('http://127.0.0.1:2001/api/clients', {
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                setIsLoading(false);
                setClientsData(json.data);
                console.log(json.data)
            })
    }, [])



    const data = useMemo(
        () => clientsData,
        []
    )

    const [formToggle, setFormToggle] = useState(true)

    const addHandler = () => {
        setFormToggle(true)
    }
    const updateHandler = () => {
        setFormToggle(false)
    }

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }


    return (
            <DashboardLayout>

                {formToggle ? <AddClient /> : <UpdateClient />}
                <Table onAdd={addHandler} onUpdate={updateHandler} columns={columns} data={clientsData} />
                {/*<button onClick={addHandler} >Add</button>*/}
                {/*<button onClick={updateHandler} >Update</button>*/}

            </DashboardLayout>
    );
};

export default AdminDashboard;