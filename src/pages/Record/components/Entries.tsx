import SpinLoaderState from "@/components/spin/spin.atom";
import Table from "@/components/table/Table.component";
import TableBody, { RowContext } from "@/components/table/TableBody.component";
import TableCell from "@/components/table/TableCell.component";
import TableHead from "@/components/table/TableHead.component";
import TableRow from "@/components/table/TableRow.component";
import { deleteEntry } from "@/lib/database/write.db";
import Icon from "@/molecules/Icon.mole";
import { UserState } from "@/state/app.atom";
import { UserRecordState } from "@/state/records.atom";
import { ActionType } from "@/types/app.type";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

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

function Entries() {
  const { id } = useParams();
  const user = useRecoilValue(UserState);
  const [entries, setEntries] = useRecoilState(
    UserRecordState([id, user?.uid!])
  );
  const startSpin = useSetRecoilState(SpinLoaderState);

  const total = entries.reduce(
    (pre, { action, value }) =>
      action === ActionType.INCOME ? pre - value : pre + value,
    0
  );

  const handleDelete = async (entryId: string) => {
    if (user?.uid && id) {
      startSpin(true);
      const deleted = await deleteEntry(user.uid, id, entryId);
      setEntries((pre) => pre.filter((item) => item.id !== entryId));
      startSpin(false);
    }
  };
  return (
    <div className="Mt(1rem)">
      <Table data={entries} className="W(100%) Fz(1.6rem) Bdcl(c)">
        <TableHead className="H(4rem) Bgc(#082032)">
          <TableRow>
            <TableCell>ACTION</TableCell>
            <TableCell>TITLE</TableCell>
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
            <TableCell.Dynamic>
              <span data-key="action"></span>
            </TableCell.Dynamic>
            <TableCell.Dynamic className="W(minc) ">
              <span data-key="title"></span>
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
        <p className="Fz(1.8rem)">Total:&nbsp;</p>
        <p className="Fz(1.8rem)">{total}</p>
      </div>
    </div>
  );
}

export default Entries;
