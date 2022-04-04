import DashboardLayout from "../Layouts/DashboardLayout";
import MOCK_DATA from "../components/MOCK_DATA.json";
import {useMemo} from "react";
import {useState} from "react";
import Table from "../components/Dashboard/Table";
import AddClient from "../components/Dashboard/Admin/AddClient";
import UpdateClient from "../components/Dashboard/Admin/UpdateClient";


const AdminDashboard = () => {

    const data = useMemo(
        () => MOCK_DATA,
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Firstname',
                accessor: 'first_name',
            },
            {
                Header: 'Lastname',
                accessor: 'last_name',
            }
            ,
            {
                Header: 'Profession',
                accessor: 'email',
            },
            {
                Header: 'Age',
                accessor: 'gender',
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




    return (
            <DashboardLayout>

                {formToggle ? <AddClient /> : <UpdateClient />}
                <Table onAdd={addHandler} onUpdate={updateHandler} columns={columns} data={data} />
                {/*<button onClick={addHandler} >Add</button>*/}
                {/*<button onClick={updateHandler} >Update</button>*/}

            </DashboardLayout>
    );
};

export default AdminDashboard;