import React, { ReactElement, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ButtonRipple from '../components/buttons/ButtonRipple.component';
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
            <h2 className="Fz(2.4rem)">Add New Record</h2>
            <div className="D(f) Fxd(c) Mt(1rem)">
                <input placeholder="record name..." onChange={handleChange} className="Fz(16px) H(4rem) Bdrs(4rem) Px(2rem)" type="text" />
                <ButtonRipple onClick={addRecord} className="Mt(1rem) Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem)">ADD</ButtonRipple>
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
                <h2 className="Fz(2.4rem)">Records</h2>

                <div className="">
                    {records.map(item=>(
                        <ButtonRipple onClick={()=>handleClick(item)} key={item} className="H(6rem) Cur(p) W(100%) Trs(trs-d) Bgc(#00edb0):h Mt(1rem) Bgc(#00adb5) Bdrs(1rem) D(f) Jc(c) Ai(c)">
                            <p className="Fz(1.8rem) Fw(600) C(#eee)">{item}</p>
                        </ButtonRipple>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Records
