import React, { ReactElement, useContext } from 'react'
import Table from './Table.component';
import TableBody, { RowContext } from './TableBody.component';
import TableRow from './TableRow.component';
import { RowChildContext } from './TableRowWithChild.component';

interface Props {
    children: ReactElement | ReactElement[],
    columnCount?: number,
    idKey: string  
}



function TableRowChild({ children,columnCount=15,idKey }: Props): ReactElement {

    const data = useContext(RowChildContext);

    return (
        <tr className="W(100%)">
            <td className="" colSpan={columnCount}>
                <Table data={data} className="W(100%)">
                    <TableBody idKey={idKey}>
                        <TableRow className="Bgc(gray)">
                            {children}
                        </TableRow>
                    </TableBody>
                </Table>
            </td>
        </tr>
    )
}

export default TableRowChild
