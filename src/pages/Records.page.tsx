import React, { ReactElement, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AppState } from '../state/app.atom';
import { RecordsState, RecordState } from '../state/records.atom'

interface Props {

}

const AddNewRecord = () => {

    const [record,setRecord] = useState('');
    const [records,setRecords] = useRecoilState(RecordsState);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRecord(event.target.value);
    }

    const addRecord = ()=>{
        console.log(!records.includes(record),records.length > 0 )
        if (record && record.length > 0 && !records.includes(record) ) {
            setRecords(pre=>[
                ...pre,
                record
            ])
        }
    }

    return (
        <div className="">
            <h2>Add New Record</h2>
            <div className="D(f) Mt(1rem)">
                <input onChange={handleChange} className="Fz(1.4rem)" type="text" />
                <button onClick={addRecord} className="D(b) H(2rem) Px(3rem)">ADD</button>
            </div>
        </div>
    )
}

function Records({ }: Props): ReactElement {

    const records = useRecoilValue(RecordsState);
    const [record,setRecord] = useRecoilState(RecordState);
    const setAppState = useSetRecoilState(AppState);


    const handleClick = (val:string)=>{
        setRecord(pre=>({
            ...pre,
            currentRecord: val
        }));

        setAppState(pre=>({
            ...pre,
            page: 'record'
        }))
    }

    console.log(record)

    return (
        <div className="W(600px) Mx(a) Pt(3rem)">
            
            <AddNewRecord/>

            <div className="Mt(2rem)">
                <h2>Records</h2>

                <div className="">
                    {records.map(item=>(
                        <div onClick={()=>handleClick(item)} key={item} className="H(4rem) Mt(1rem) Bgc(lightgray) Bdrs(1rem) D(f) Jc(c) Ai(c)">
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Records
