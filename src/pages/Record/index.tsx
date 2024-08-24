import React, { ReactElement, Suspense, useContext, useState } from "react";
import Loading from "@/molecules/Loading.mole";
import CreateRecordPopup from "./components/CreateRecordPopup";
import RecordTabs from "./components/RecordTabs";
import DeletePopup from "./components/DeletePopup";
import Entries from "./components/Entries";
import { useRecoilValue } from "recoil";
import { UserSingleRecordState } from "@/state/records.atom";
import { useParams } from "react-router-dom";
import { RecoilSync } from "recoil-sync";
import { RECORD_ID_SYNC } from "@/state/app.atom";

interface Props {}

function Record({}: Props): ReactElement {
  const record = useRecoilValue(UserSingleRecordState);

  return (
    <div className="W(600px) Mx(a) Pt(3rem)">
      <div className="">
        <div className="D(f) Jc(sb) Ai(c)">
          <h2 className="Fz(2.4rem) ">{record?.name}</h2>

          <DeletePopup />
        </div>
        <RecordTabs />
        <CreateRecordPopup />
      </div>

      <Suspense fallback={<Loading.Small type="bubbles" />}>
        <Entries />
      </Suspense>
    </div>
  );
}

function RecordWraper() {
  const { id } = useParams();
  return (
    <RecoilSync storeKey={RECORD_ID_SYNC} read={() => id}>
      <Record />
    </RecoilSync>
  );
}

export default RecordWraper;
