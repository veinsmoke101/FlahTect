import DashboardLayout from "../Layouts/DashboardLayout";
import {useMemo, useState, useEffect} from "react";
import Table from "../components/Dashboard/Table";
import AddClient from "../components/Dashboard/Admin/AddClient";
import UpdateClient from "../components/Dashboard/Admin/UpdateClient";


const AdminDashboard = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [clientsData, setClientsData] = useState([])

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
                <Table instance={"client"}  onAdd={addHandler} onUpdate={updateHandler} columns={columns} data={clientsData} />

            </DashboardLayout>
    );
};

export default AdminDashboard;