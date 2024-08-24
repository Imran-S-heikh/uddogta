import SpinLoaderState from "@/components/spin/spin.atom";
import Table from "@/components/table/Table.component";
import TableBody, { RowContext } from "@/components/table/TableBody.component";
import TableCell from "@/components/table/TableCell.component";
import TableHead from "@/components/table/TableHead.component";
import TableRow from "@/components/table/TableRow.component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import { deleteEntry } from "@/lib/database/write.db";
import Icon from "@/molecules/Icon.mole";
import { TabState, UserState } from "@/state/app.atom";
import { UserRecordFilterState, UserRecordState } from "@/state/records.atom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";

const DeleteElement = ({ onDelete }: { onDelete?: (id: string) => void }) => {
  const { id } = useContext(RowContext);

  const handleClick = () => {
    if (id) {
      onDelete && onDelete(id);
    }
  };

  return (
    <div className="Cur(p) Op(.6):a" onClick={handleClick}>
      <Icon icon="delete" className="Fz(2.5rem)" />
    </div>
  );
};

function Title({ title }: { title: string } & any) {
  if (title.length < 18) {
    return <span className="Ell Maw(15rem)! D(b)">{title}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="Ell Maw(15rem)! D(b)">{title}</span>
        </TooltipTrigger>
        <TooltipContent className="Maw(20rem) Ta(c)">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Entries() {
  const { id } = useParams();
  const user = useRecoilValue(UserState);
  const action = useRecoilValue(TabState);
  const setEntries = useSetRecoilState(UserRecordState([id, user?.uid!]));
  const entries = useRecoilValue(UserRecordFilterState);
  const startSpin = useSetRecoilState(SpinLoaderState);

  const total = entries.reduce((pre, { value }) => pre + value, 0);

  const handleDelete = async (entryId: string) => {
    if (user?.uid && id) {
      startSpin(true);
      await deleteEntry(user.uid, id, entryId);
      setEntries((pre) => pre.filter((item) => item.id !== entryId));
      startSpin(false);
    }
  };
  return (
    <div className="Mt(1rem)">
      <Table data={entries} className="W(100%) Fz(1.6rem) Bdcl(c)">
        <TableHead className="H(4rem) Bgc(#082032)">
          <TableRow>
            <TableCell className="Ta(start) Pstart(1rem)">TITLE</TableCell>
            <TableCell>AMOUNT</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>REMOVE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody idKey="id">
          <TableRow
            className="H(4rem) Bgc(#2c394b) "
            style={{ borderTop: "1px solid #334756" }}
          >
            <TableCell.Dynamic className="W(minc) Ta(start) Pstart(1rem) ">
              <Title data-key="title" data-map="title" />
            </TableCell.Dynamic>
            <TableCell.Dynamic>
              <span data-key="value"></span>
            </TableCell.Dynamic>
            <TableCell.Dynamic
              formatter={(val) => new Date(val).toDateString()}
            >
              <span data-key="date"></span>
            </TableCell.Dynamic>
            <TableCell className="">
              <DeleteElement onDelete={handleDelete} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="D(f) Gap(1rem) Bgc(#082032) Jc(fe) Py(1rem) Px(3rem) W(maxc) Mstart(a)">
        <p className="Fz(1.8rem) Tt(c)">Total {action.toLowerCase()}:&nbsp;</p>
        <p className="Fz(1.8rem)">{total}</p>
      </div>
    </div>
  );
}

export default Entries;
