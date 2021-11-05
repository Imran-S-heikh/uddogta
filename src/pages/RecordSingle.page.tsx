import React, { ReactElement, useState } from 'react'
import { useRecoilState } from 'recoil';
import ButtonRipple from '../components/buttons/ButtonRipple.component';
import DropDown from '../components/drop-down/DropDown.component';
import Table from '../components/table/Table.component';
import TableBody from '../components/table/TableBody.component';
import TableCell from '../components/table/TableCell.component';
import TableHead from '../components/table/TableHead.component';
import TableRow from '../components/table/TableRow.component';
import { RecordState } from '../state/records.atom';

interface Props {

}

function RecordSingle({ }: Props): ReactElement {

    const [state, setState] = useRecoilState(RecordState);
    const [value, setValue] = useState(0);
    const [title, setTitle] = useState('');
    const [action, setAction] = useState('ADD');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(event.target.value as any)) return;
        setValue(Number(event.target.value));
    }
    const handleClick = () => {
        setState(pre => ({
            ...pre,
            record: [
                ...pre.record,
                {
                    action: 'ADD',
                    value: value,
                    date: (new Date()).toLocaleDateString(),
                    title: title
                }
            ]
        }))
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.target.value);
    }

    console.log(state.record)

    return (
        <div className="W(600px) Mx(a) Pt(3rem)">
            <div className="">
                <h2 className="Fz(2.4rem) ">Add New</h2>
                <div className="D(f) Fxd(c) Mt(2rem)">
                    <div className="D(f) Fxd(c) Gap(1rem) Fx(1)">
                        <p className="Fz(1.6rem) C(#96abbb)">Title:</p>
                        <input maxLength={15} value={title} placeholder="title..." className="Fz(16px) Fx(1) Mih(4rem) Bdrs(4rem) Px(2rem)" onChange={handleTitle} />
                    </div>
                    <div className="D(f) Gap(2rem) Mt(1rem)">
                        <div className="D(f) Fxd(c) Gap(1rem) Fx(1)">
                            <p className="Fz(1.6rem) C(#96abbb)">Value:</p>
                            <input value={value} placeholder="amount..." className="Fz(16px) Fx(1) H(4rem) Bdrs(4rem) Px(2rem)" onChange={handleChange} />
                        </div>
                        <div className="D(f) Fx(1)">
                            <DropDown onChange={setAction} label="Action:" className="W(100%)" options={['ADD', 'RM']} />
                        </div>
                    </div>
                    <ButtonRipple onClick={handleClick} className="Mt(1rem) Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem)">SUBMIT</ButtonRipple>
                </div>
            </div>
            <div className="Mt(3rem)">
                <Table data={state.record} className="W(100%) Fz(1.6rem) Bdcl(c)">
                    <TableHead className="H(4rem) Bgc(#082032)">
                        <TableCell>ACTION</TableCell>
                        <TableCell>TITLE</TableCell>
                        <TableCell>AMOUNT</TableCell>
                        <TableCell>DATE</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow className="H(4rem) Bgc(#2c394b) " style={{ borderTop: '1px solid #334756' }}>
                            <TableCell.Dynamic >
                                <span data-key="action"></span>
                            </TableCell.Dynamic>
                            <TableCell.Dynamic className="W(minc) ">
                                <span data-key="title"></span>
                            </TableCell.Dynamic>
                            <TableCell.Dynamic >
                                <span data-key="value"></span>
                            </TableCell.Dynamic>
                            <TableCell.Dynamic >
                                <span data-key="date"></span>
                            </TableCell.Dynamic>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default RecordSingle
