import {useTable} from 'react-table'
import classes from "./Table.module.scss";
import editIcon from '../../images/edit 1.svg'
import deleteIcon from '../../images/delete 2.png'
import addIcon from '../../images/Add-SVG-Icon-0sfe.svg'
import {ClientContext} from "../../contexts/clientDataContext";
import {useContext} from "react";
import {RDVContext} from "../../contexts/rdvDatacontext";
import {AuthContext} from "../../contexts/UserAuthContext";
import {AdminContext} from "../../contexts/AdminAuthContext";

const Table = ({instance, columns, data, onAdd, onUpdate}) => {

    const {setClientId, clientId} = useContext(ClientContext)
    const {rdvId, setRdvId} = useContext(RDVContext)

    const updateHandler = (id) => {
        onUpdate()
        if (instance === "client")
            setClientId(id)
        else
            setRdvId(id)
        console.log('Table' + clientId)
    }
    let myHeaders = new Headers();
    if (instance === "rdv") {
        const {loggedClientRef} = useContext(AuthContext)
        myHeaders.append("clientRef", loggedClientRef);
    } else {
        const {jwtToken} = useContext(AdminContext)
        myHeaders.append("Authorization", `Bearer ${jwtToken}`)
    }

    const deleteHandler = (id) => {
        const clientOrRdv = (instance === "client") ? "client" : "rdv"
        fetch(`http://127.0.0.1:2001/api/${clientOrRdv}/delete`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then(() => alert(`${clientOrRdv} deleted successfuly`))
            .catch(() => alert('Something went wrong'))
    }

    const tableInstance = useTable({columns, data})

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <div className={classes.tableWrapper}>
            <div className={classes.history}>
                <hr/>
                <div className={classes.wrapper}>
                    <span>
                        History
                    </span>

                    <div onClick={onAdd} className={classes.add}>
                        <img src={addIcon} alt="add"/>
                        <u>Add a record</u>
                    </div>

                </div>
            </div>
            <div className={classes.tableScroll}>


                <table {...getTableProps()}>
                    <thead className=''>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>

                                    ))
                                }
                                <th>Taha</th>
                            </tr>
                        ))}
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    <td>
                                        <img onClick={() => updateHandler(row.values.id)} src={editIcon} alt="update"/>
                                        <img onClick={() => deleteHandler(row.values.id)} src={deleteIcon}
                                             alt="delete"/>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Table;