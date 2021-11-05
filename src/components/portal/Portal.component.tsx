import {createPortal} from 'react-dom';
import React, { ReactElement, ReactNode } from 'react';


interface Props {
    children: ReactNode
}

function Portal({children}: Props): ReactElement {
    return createPortal( children ,
        document.getElementById('modal')!
    )
}

export default Portal;
