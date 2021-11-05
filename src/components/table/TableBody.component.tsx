import React, { createContext, ReactElement, useContext } from 'react'
import { TableContext } from './Table.component';

interface Props {
    children: ReactElement,
    className?: string
}

export const RowContext = createContext<any>(null);

function TableBody({children,className}: Props): ReactElement {

    const data = useContext(TableContext);

    return (
        <tbody className={className}>
            {data.map((row:any)=>(
                <RowContext.Provider value={row}>
                    {children}
                </RowContext.Provider>
            ))}
        </tbody>
    )
}

export default TableBody;
