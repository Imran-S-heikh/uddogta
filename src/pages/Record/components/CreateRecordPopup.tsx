import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ButtonRipple from "@/components/buttons/ButtonRipple.component";
import Icon from "@/molecules/Icon.mole";
import Backdrop from "@/components/backdrop/Backdrop.component";
import ClickAwayListener from "react-click-away-listener";
import { TabState, UserState } from "@/state/app.atom";
import { useNavigate, useParams } from "react-router-dom";
import { createEntry, deleteRecord } from "@/lib/database/write.db";
import { UserRecordsState } from "@/state/records.selector";
import { UserRecordState } from "@/state/records.atom";
import DropDown from "@/components/drop-down/DropDown.component";
import SpinLoaderState from "@/components/spin/spin.atom";
import { Filter, Entry } from "@/type";
import { ActionType } from "@/types/app.type";
import Hide from "@/molecules/Hide.mole";

const CreateRecordPopup = () => {
  const [open, setOpen] = useState(false);
  const tab = useRecoilValue(TabState);
  const user = useRecoilValue(UserState);
  const { id } = useParams();
  const setEntries = useSetRecoilState(UserRecordState([id, user?.uid]));
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const action = useRecoilValue(TabState);
  const startSpin = useSetRecoilState(SpinLoaderState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(event.target.value as any)) return;
    setValue(Number(event.target.value));
  };

  const resetState = () => {
    setValue(0);
    setTitle("");
    // setAction(ActionType.EXPENSE);
  };

  const handleClick = async () => {
    if (user?.uid && id) {
      startSpin(true);
      const data: Filter<Entry, "id"> = {
        value,
        title,
        date: Date.now(),
        action: action,
      };
      const ref = await createEntry(user.uid, id, data);
      setEntries((pre) => [...pre, { ...data, id: ref.id }]);
      startSpin(false);
      resetState();
      setOpen(false);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <React.Fragment>
      <ButtonRipple
        onClick={() => setOpen(true)}
        className="Mt(5rem) W(100%) Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem)"
      >
        Add <span className="Tt(c)">{tab.toLowerCase()}</span> Entry
      </ButtonRipple>
      <Backdrop open={open} className="Jc(c) Ai(c)">
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="Bgc(#082032) P(2rem) Bdrs(1rem) Pos(r)">
            <button
              className="Pos(a) Bgc(t) End(1.5rem) T(1.5rem) Op(.5):active"
              onClick={() => setOpen(false)}
            >
              <Icon icon="close" className="Fz(2rem) C(#fff) Cur(p) Bgc(t)" />
            </button>
            <h2 className="Ta(c) Fz(2rem) Fw(b) Tt(c)">
              <Hide
                open={action === ActionType.INCOME}
                fallback={<Icon icon="calendar-minus" className="Fz(2rem) " />}
              >
                <Icon icon="calendar-plus" className="Fz(2rem)" />
              </Hide>
              Add {action.toLowerCase()} Entry
            </h2>
            <div className="D(f) Fxd(c) Mt(2rem)">
              <div className="D(f) Fxd(c) Gap(1rem) Fx(1)">
                <p className="Fz(1.6rem) C(#96abbb)">Title:</p>
                <input
                  value={title}
                  placeholder="title..."
                  className="Fz(16px) Fx(1) Mih(4rem) Bdrs(4rem) Px(2rem) Mt(.5rem)"
                  onChange={handleTitle}
                />
              </div>
              <div className="D(f) Gap(2rem) Mt(1rem)">
                <div className="D(f) Fxd(c) Gap(1rem) Fx(1)">
                  <p className="Fz(1.6rem) C(#96abbb)">Value:</p>
                  <input
                    value={value}
                    placeholder="amount..."
                    className="Fz(16px) Fx(1) H(4rem) Bdrs(4rem) Px(2rem) Mih(4rem) Mt(.5rem)"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="D(f) Fx(1)">
                  <DropDown
                    onChange={setAction}
                    label="Action:"
                    className="W(100%)"
                    options={[ActionType.EXPENSE, ActionType.INCOME]}
                  />
                </div> */}
              </div>
              <ButtonRipple
                onClick={handleClick}
                className="Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem) Mt(2rem)"
              >
                SUBMIT
              </ButtonRipple>
            </div>
          </div>
        </ClickAwayListener>
      </Backdrop>
    </React.Fragment>
  );
};

export default CreateRecordPopup;
