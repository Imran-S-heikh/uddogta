import React, { Children, ReactElement, ReactNode, useContext } from 'react'
import Hide from '../../molecules/Hide.mole';
import { RowContext } from './TableBody.component'

interface Props {
    component?: 'th' | 'td',
    children?: ReactNode,
    className?: string
}

function TableCell({ component = "th", ...others }: Props): ReactElement {
    return React.createElement(component, others)
}


type element = React.ReactElement<any, string | React.JSXElementConstructor<any>>
function handleElement(el: element, getValue: (arg: string | number) => any,formatter: (val: number | string)=> number | string) {
    const { type, props: { 'data-key': dataKey, 'data-map': dataMap = "children", ...others } } = el;

    if (dataKey === undefined) {
        return el
    }

    const value = getValue(dataKey);

    if (typeof value === 'string' || typeof value === 'number') {
        return React.createElement(type, {
            ...others,
            [dataMap]: formatter(value),
        })
    }

    return el
}

interface DynamicTableCell<T> {
    children: ReactElement | ReactElement[],
    className?: string,
    wraper?: boolean,
    wraperClass?: string,
    component?: 'th' | 'td',
    formatter?: (val: number | string)=> number | string 
    // keys: string[]
}

function DynamicTableCell<T>({ children, wraperClass, className, wraper = false, component = "th",formatter = (val=>val) }: DynamicTableCell<T>) {

    const row = useContext(RowContext);

    // console.log(row)

    const sendValue = (key: string | number) => {
        return row[key]
    }

    return React.createElement(component, {
        children: Children.map(children, el => handleElement(el, sendValue,formatter)),
        className: className
    })
}

TableCell.Dynamic = DynamicTableCell;

export default TableCell;

// (
//     wraper ?
//         <div className={wraperClass}>
//             {Children.map(children, el => handleElement(el, sendValue))}
//         </div> :
//         Children.map(children, el => handleElement(el, sendValue))
// ),
