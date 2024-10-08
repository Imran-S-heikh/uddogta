import { atom, selector } from "recoil";
import { getUserRecords } from "../lib/database/read.db";
import { UserState } from "./app.atom";

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