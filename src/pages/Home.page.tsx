import React, { ReactElement, Suspense, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ButtonRipple from "../components/buttons/ButtonRipple.component";
import { auth } from "../firebase";
import { AppState, UserState } from "../state/app.atom";
import { RecordIdState } from "../state/records.atom";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Loading from "../molecules/Loading.mole";
import { Filter, Record } from "../type";
import { createRecord } from "../lib/database/create.db";
import { User } from "firebase/auth";
import { UserRecordsState } from "../state/records.selector";
import { Link, Navigate } from "react-router-dom";

interface Props {}

const AddNewRecord = () => {
  const [record, setRecord] = useState<Filter<Record, "id">>({ name: "" });
  const [user] = useAuthState(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((pre) => ({ ...pre, name: event.target.value }));
  };

  const addRecord = () => {
    if (record && record.name.length > 0 && user) {
      createRecord(user.uid, record)
        .then((res) => {
          console.log(res);
        })
        .catch(console.log);
    }
  };

  return (
    <div className="">
      <h2 className="Fz(2.4rem)">Add New Record</h2>
      <div className="D(f) Fxd(c) Mt(1rem)">
        <input
          placeholder="record name..."
          onChange={handleChange}
          className="Fz(16px) H(4rem) Bdrs(4rem) Px(2rem)"
          type="text"
        />
        <ButtonRipple
          onClick={addRecord}
          className="Mt(1rem) Fz(1.6rem) Bgc(#ff4c29) C(#fff) D(b) H(2rem) Px(3rem) H(4rem) Bdrs(4rem)"
        >
          ADD
        </ButtonRipple>
      </div>
    </div>
  );
};

function RecordsItems() {
  const records = useRecoilValue(UserRecordsState);

  return (
    <div className="">
      {records.map((item) => (
        <Link to={`/records/${item.id}`} className="Td(n)">
          <ButtonRipple
            key={item.id}
            className="H(6rem) Cur(p) W(100%) Trs(trs-d) Bgc(#00edb0):h Mt(1rem) Bgc(#00adb5) Bdrs(1rem) D(f) Jc(c) Ai(c)"
          >
            <p className="Fz(1.8rem) Fw(600) C(#eee)">{item.name}</p>
          </ButtonRipple>
        </Link>
      ))}
    </div>
  );
}

function Home({}: Props): ReactElement {
  const user = useRecoilValue(UserState);

  if (!Boolean(user)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="W(600px) Mx(a) Pt(3rem)">
      <AddNewRecord />

      <div className="Mt(2rem)">
        <div className="D(f) Jc(sb) Ai(c)">
          <h2 className="Fz(2.4rem)">Records</h2>
          <h5 className="Fz(2rem) Op(.5)">{user?.displayName}</h5>
        </div>
        <Suspense fallback={<Loading.Small type="bubbles" />}>
          <RecordsItems />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
