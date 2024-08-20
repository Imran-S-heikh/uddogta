import React, { ReactElement, Suspense, useContext, useState } from "react";
import Loading from "@/molecules/Loading.mole";
import CreateRecordPopup from "./components/CreateRecordPopup";
import RecordTabs from "./components/RecordTabs";
import DeletePopup from "./components/DeletePopup";
import Entries from "./components/Entries";

interface Props {}

function Record({}: Props): ReactElement {
  return (
    <div className="W(600px) Mx(a) Pt(3rem)">
      <div className="">
        <div className="D(f) Jc(sb) Ai(c)">
          <h2 className="Fz(2.4rem) ">Add New</h2>

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

export default Record;
