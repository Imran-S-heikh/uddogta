import React, { createContext, ReactElement, useContext } from 'react'
import { TableContext } from './Table.component';

interface Props {
    children: ReactElement,
    className?: string,
    idKey: string
}

export const RowContext = createContext<any>(null);

function TableBody({children,className,idKey }: Props): ReactElement {

    const data = useContext(TableContext);
    
    return (
        <tbody className={className}>
            {data.map((row:any)=>(
                <RowContext.Provider key={row[idKey]} value={row}>
                    {children}
                </RowContext.Provider>
            ))}
        </tbody>
    )
}

export default TableBody;
