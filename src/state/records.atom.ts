import { atom, atomFamily, selector } from "recoil";
import { getUserRecord, getUserSingleRecord } from "../lib/database/read.db";
import { Entry } from "../type";
import { StateKeys } from "../types/state.type";
import { setData } from "../utils/manage.utils";
import { RecordIdState, UserState, AppState } from "./app.atom";

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
});

export const UserRecordStateSelector = selector({
  key: "USER_RECORD_STATE_SELECTOR",
  get({ get }) {
    const user = get(UserState);
    const recordId = get(RecordIdState);

    if (!user || !recordId) {
      return [];
    }

    return get(UserRecordState([recordId, user?.uid]));
  },
});

export const UserRecordFilterState = selector({
  key: "USER_RECORD_FILTER_STATE",
  get({ get }) {
    const data = get(UserRecordStateSelector);
    const appState = get(AppState);
    return data.filter((d) => d.action === appState.tab);
  },
});

export const UserSingleRecordState = selector({
  key: "USER_SINGLE_RECORD_STATE",
  get({ get }) {
    const recordId = get(RecordIdState);
    const user = get(UserState);

    if (!user || !recordId) {
      return null;
    }

    const data = getUserSingleRecord(user?.uid!, recordId);
    return data;
  },
});
