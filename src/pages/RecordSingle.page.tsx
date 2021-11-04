import React, { ReactElement, useState } from 'react'
import { useRecoilState } from 'recoil';
import { RecordState } from '../state/records.atom';

interface Props {

}

function RecordSingle({ }: Props): ReactElement {

    const [state, setState] = useRecoilState(RecordState);
    const [value, setValue] = useState('0');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }
    const handleClick = () => {
        setState(pre => ({
            ...pre,
            record: [
                ...pre.record,
                {
                    action: 'ADD',
                    value: value,
                    date: Date()
                }
            ]
        }))
    }

    return (
        <div className="W(600px) Mx(a) Pt(3rem)">
            <div className="">
                <h2>Add Values</h2>
                <div className="D(f)">
                    <input type="number" onChange={handleChange} />
                    <button onClick={handleClick} className="H(2rem) Px(2rem)">ADD</button>
                </div>
            </div>
            <div className="Mt(3rem)">
                {state.record.map(item => (
                    <div className="D(f)" style={{ gap: '1rem' }}>
                        <h3>{item.action}</h3>
                        <h3>{item.value}</h3>
                        <h3>{item.date}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecordSingle
