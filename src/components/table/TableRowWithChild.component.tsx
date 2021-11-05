import React, { Children, createContext, ReactElement, useContext, useEffect } from 'react'
import { RowContext } from './TableBody.component';

interface Props {
    children: ReactElement[]
}

export const RowChildContext = createContext<any>(null);

function TableRowWithChild({children}: Props): ReactElement {

    const [rowdata,childData] = useContext(RowContext);
    

    return (
        <RowChildContext.Provider value={childData}>
            <RowContext.Provider value={rowdata}>
                {children}
            </RowContext.Provider>
        </RowChildContext.Provider>
    )
}

export default TableRowWithChild
