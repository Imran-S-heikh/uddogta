import React, { createContext, ReactElement } from 'react'

interface Props {
    children: ReactElement | ReactElement[],
    data: any[],
    className?: string,
    style?: React.CSSProperties
    // column: number 
}

export const TableContext = createContext<any>([]);

function Table({ children,data,className,style }: Props): ReactElement {
    return (
        <TableContext.Provider value={data} >
            <table className={className} cellSpacing="0" cellPadding="0" style={style}>
                {children}
            </table>
        </TableContext.Provider>
    )
}

export default Table;
