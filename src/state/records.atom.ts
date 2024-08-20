import { onAuthStateChanged, User } from "firebase/auth";
import { atom, atomFamily, selector } from "recoil";
import { auth } from "../firebase";
import { getUserRecord } from "../lib/database/read.db";
import { Entry, Record } from "../type";
import { StateKeys } from "../types/state.type";
import { getData, setData } from "../utils/manage.utils";
import { AppState, UserState } from "./app.atom";

export const RecordsState = atom({
  key: "RECORDS_STATE",
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((state) => setData(StateKeys.Records, state));
    },
  ],
});

export interface RecordState {
  currentRecord: string | null;
  record: any[];
}

export const RecordIdState = atom<string | null>({
  key: "RECORD_ID_STATE",
  default: null,
});

export const UserRecordState = atomFamily<
  Entry[],
  [string | undefined, string | undefined]
>({
  key: "USER_RECORD_STATE",
  default: ([id, userId]) =>
    new Promise(async (setSelf) => {
      let data: Entry[] = [];

      if (!id || !userId) {
        return setSelf([]);
      }

      getUserRecord(userId, id)
        .then((d) => {
          data = d;
        })
        .finally(() => {
          setSelf(data);
        });
    }),
  // effects: (id) => [
  //   ({ setSelf, getLoadable }) => {
  //     // const user = getLoadable(UserState).getValue();
  //     console.log(auth.currentUser);

  //     if (!id || auth.currentUser?.uid) {
  //       return setSelf([]);
  //     }

  //     let data: Entry[] = [];

  //   },
  // ],
});
