import { useTable } from 'react-table'
import classes from "./Table.module.scss";
import editIcon from '../../images/edit 1.svg'
import deleteIcon from '../../images/delete 2.png'
import addIcon from '../../images/Add-SVG-Icon-0sfe.svg'


const Table = ({columns, data, onAdd, onUpdate}) => {

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

                    <div className={classes.add}>
                        <img onClick={onAdd} src={addIcon} alt="add"/>
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

                                    ))}
                                <th >
                                    Action
                                </th>
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
                                         <img onClick={onUpdate} src={editIcon} alt="update"/>
                                         <img src={deleteIcon} alt="delete"/>
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