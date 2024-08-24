import { atom, selector } from "recoil";
import { getUserRecord, getUserRecords } from "../lib/database/read.db";
import { UserState } from "./app.atom";
import { urlSyncEffect } from "recoil-sync";
import { number } from "@recoiljs/refine";
// import { RecordIdState } from "./records.atom";

export const UserRecordsStateSelector = selector({
  key: "USER_RECORDS_STATE_SELECTOR",
  get: async ({ get }) => {
    const user = get(UserState);
    if (user) {
      const data = await getUserRecords(user.uid);
      return data;
    }

    return [];
  },
});

export const UserRecordsState = atom({
  key: "USER_RECORDS_STATE",
  default: UserRecordsStateSelector,
});

// export const UserRecordState = selector({
//   key: "USER_RECORD_STATE",
//   get: ({ get }) => {
//     const user = get(UserState);
//     const recordId = get(RecordIdState);

//     if (user && recordId) {
//       return getUserRecord(user.uid, recordId);
//     }

//     return [];
//   },
// });

