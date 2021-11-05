import React, { ReactElement } from 'react'
import DropDown from './DropDown.component'

interface Props {
    
}

function DropDownExample({}: Props): ReactElement {
    return (
        <div>
            <DropDown
                options={['Hello','World','My','Name']}
            />
        </div>
    )
}

export default DropDownExample;
