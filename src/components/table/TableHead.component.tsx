import React, { ReactElement, ReactNode } from 'react'

interface Props {
    className?: string,
    children?: ReactNode
}

function TableHead({className,children}: Props): ReactElement {
    return (
        <thead className={className}>
            {children}
        </thead>
    )
}

export default TableHead
