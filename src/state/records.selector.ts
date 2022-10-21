import { selector } from "recoil";
import { getUserRecord, getUserRecords } from "../lib/database/read.db";
import { UserState } from "./app.atom";
import { RecordIdState } from "./records.atom";

// const UserState

export const UserRecordsState = selector({
  key: "USER_RECORDS_STATE",
  get: async ({ get }) => {
    const user = get(UserState);

    if (user) {
      const data = await getUserRecords(user.uid);

      return data;
    }

    return [];
  },
});

// export const UserRecordStateDefault = selector({
//   key: "USER_RECORD_STATE/DEFAULT",
//   get: async ({ get }) => {
   
//     if (id && user?.uid) {
//       const record = await getUserRecord(user.uid, id);
//       return record;
//     } else {
//       return [];
//     }
//   }
// });


