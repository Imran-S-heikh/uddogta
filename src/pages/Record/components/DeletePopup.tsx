import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ButtonRipple from "@/components/buttons/ButtonRipple.component";
import Icon from "@/molecules/Icon.mole";
import Backdrop from "@/components/backdrop/Backdrop.component";
import ClickAwayListener from "react-click-away-listener";
import { UserState } from "@/state/app.atom";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRecord } from "@/lib/database/write.db";
import { UserRecordsState } from "@/state/records.selector";

const DeletePopup = () => {
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(UserState);
  const { id } = useParams();
  const setRecords = useSetRecoilState(UserRecordsState);
  const navigate = useNavigate();

  const handleDeleteRecord = async () => {
    if (user?.uid && id) {
      setOpen(false);
      setRecords((pre) => pre.filter((item) => item.id !== id));
      await deleteRecord(user.uid, id);
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <div className="Cur(p) Op(.6):a" onClick={() => setOpen(true)}>
        <Icon icon="delete" className="Fz(3rem)" />
      </div>
      <Backdrop open={open} className="Jc(c) Ai(c)">
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="Bgc(#082032) P(2rem) Bdrs(1rem)">
            <h2 className="Fz(2.4rem)">Are You Sure , to delete record ?</h2>

            <div className="D(f) Mt(2rem) Gp(1rem)">
              <ButtonRipple
                onClick={() => setOpen(false)}
                className="Fx(1) H(4rem) Bdrs(1rem) Fz(1.8rem) Fw(600)"
              >
                Cancel
              </ButtonRipple>
              <ButtonRipple
                onClick={handleDeleteRecord}
                className="C(#eee) Fx(1) H(4rem) Bdrs(1rem) Fz(1.8rem) Fw(600) Bgc(#ff4c29)"
              >
                Yes
              </ButtonRipple>
            </div>
          </div>
        </ClickAwayListener>
      </Backdrop>
    </React.Fragment>
  );
};

export default DeletePopup;
