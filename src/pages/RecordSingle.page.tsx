import React, { ReactElement, useContext, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonRipple from '../components/buttons/ButtonRipple.component';
import DropDown from '../components/drop-down/DropDown.component';
import Table from '../components/table/Table.component';
import TableBody, { RowContext } from '../components/table/TableBody.component';
import TableCell from '../components/table/TableCell.component';
import TableHead from '../components/table/TableHead.component';
import TableRow from '../components/table/TableRow.component';
import { RecordsState, RecordState } from '../state/records.atom';
import { v4 as uuidv4 } from 'uuid';
import Icon from '../molecules/Icon.mole';
import Backdrop from '../components/backdrop/Backdrop.component';
import ClickAwayListener from 'react-click-away-listener';
import { AppState } from '../state/app.atom';
import { ActionType } from '../types/app.type';

interface Props {

}

const DeleteElement = ({ onDelete }: { onDelete?: (id: string) => void }) => {

    const { id } = useContext(RowContext);

    const handleClick = () => {
        if (id) {
            onDelete && onDelete(id);
        }
    }

    return (
        <div className="Cur(p) Op(.6):a" onClick={handleClick}>
            <Icon icon="delete" className="Fz(2.5rem)" />
        </div>
    )
}

const DeletePopup = () => {

    const [open, setOpen] = useState(false);
    const setRecords = useSetRecoilState(RecordsState);
    const [record, setRecord] = useRecoilState(RecordState);
    const setState = useSetRecoilState(AppState);

    // console.log(record.)

    const handleDeleteRecord = () => {
        localStorage.removeItem(record.currentRecord!)
        setRecords(pre => pre.filter(item => item !== record.currentRecord));
        setRecord(pre => ({
            currentRecord: null,
            record: []
        }));
        setOpen(false);
        setState(pre => ({ ...pre, page: 'records' }))
    }

    return (
        <React.Fragment>
            <div className="Cur(p) Op(.6):a" onClick={() => setOpen(true)}>
                <Icon icon="delete" className="Fz(3rem)" />
            </div>
            <Backdrop open={open} className="Jc(c) Ai(c)">
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <div className="Bgc(#082032) P(2rem) Bdrs(1rem)">
                        <h2 className="Fz(2.4rem)">Are You Sure , to delete record ?</h2>

                        <div className="D(f) Mt(2rem) Gap(2rem)">
                            <ButtonRipple onClick={() => setOpen(false)} className="Fx(1) H(4rem) Bdrs(1rem) Fz(1.8rem) Fw(600)">
                                Cancel
                            </ButtonRipple>
                            <ButtonRipple onClick={handleDeleteRecord} className="C(#eee) Fx(1) H(4rem) Bdrs(1rem) Fz(1.8rem) Fw(600) Bgc(#ff4c29)">
                                Yes
                            </ButtonRipple>
                        </div>
                    </div>
                </ClickAwayListener>
            </Backdrop>
        </React.Fragment>
    )
}

function RecordSingle({ }: Props): ReactElement {

    const [state, setState] = useRecoilState(RecordState);
    const [value, setValue] = useState(0);
    const [title, setTitle] = useState('');
    const [action, setAction] = useState(ActionType.ADD);
    const total = state.record.reduce((pre, {action,value}) => action === ActionType.RM ? pre-value:pre+value, 0);


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
                    action: action,
                    value: value,
                    date: (new Date()).toLocaleDateString(),
                    title: title,
                    id: uuidv4()
                }
            ]
        }))
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDelete = (id: string) => {
        setState(pre => ({
            ...pre,
            record: pre.record.filter(item => item.id !== id)
        }))
    }

    return (
        <div className="W(600px) Mx(a) Pt(3rem)">
            <div className="">
                <div className="D(f) Jc(sb) Ai(c)">
                    <h2 className="Fz(2.4rem) ">Add New</h2>

                    <DeletePopup />
                </div>
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
                            <DropDown onChange={setAction} label="Action:" className="W(100%)" options={[ActionType.ADD, ActionType.RM]} />
                        </div>
                    </div>
                    <ButtonRipple onClick={handleClick} className="Mt(1rem) Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem)">SUBMIT</ButtonRipple>
                </div>
            </div>
            <div className="Mt(3rem)">
                <Table data={state.record} className="W(100%) Fz(1.6rem) Bdcl(c)">
                    <TableHead className="H(4rem) Bgc(#082032)">
                        <TableRow>
                            <TableCell>ACTION</TableCell>
                            <TableCell>TITLE</TableCell>
                            <TableCell>AMOUNT</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>REMOVE</TableCell>
                        </TableRow>
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
                            <TableCell className="">
                                <DeleteElement onDelete={handleDelete} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="D(f) Gap(1rem) Bgc(#082032) Jc(fe) Py(1rem) Px(3rem) W(maxc) Mstart(a)">
                    <p className="Fz(1.8rem)">Total:</p>
                    <p className="Fz(1.8rem)">{total}</p>
                </div>
            </div>
        </div>
    )
}

export default RecordSingle
