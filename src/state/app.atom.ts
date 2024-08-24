import { onAuthStateChanged, User } from "firebase/auth";
import { atom, selector } from "recoil";
import { auth } from "../firebase";
import { ActionType } from "../types/app.type";
import { syncEffect } from "recoil-sync";
import { nullable, string } from "@recoiljs/refine";

const PageRouteData = [
  {
    id: "LOGIN",
    title: "",
    details: "",
    path: "/login",
  },
  {
    id: "RECORDS",
    title: "",
    details: "",
    path: "/login",
  },
  {
    id: "RECORD",
    title: "",
    details: "",
    path: "/login",
  },
] as const;

type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type MutableArray<
  T extends readonly any[],
  K extends any[] = []
> = T extends readonly [infer First, ...infer Rest]
  ? MutableArray<Rest, [...K, Mutable<First>]>
  : K;

type RoutesUnion<T extends any[], K extends string[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends { id: string }
    ? RoutesUnion<Rest, [...K, First["id"]]>
    : RoutesUnion<Rest, K>
  : K[number];

type Routes = RoutesUnion<MutableArray<typeof PageRouteData>>;

export interface AppStateType {
  page: Routes;
  tab: ActionType;
}

export const AppState = atom<AppStateType>({
  key: "APP_STATE",
  default: {
    page: "RECORDS",
    tab: ActionType.EXPENSE,
  },
});

export const UserState = atom<User | null>({
  key: "USER_STATE",
  effects: [
    ({ setSelf }) => {
      const listender = onAuthStateChanged(auth, setSelf);

      return () => {
        listender();
      };
    },
  ],
  dangerouslyAllowMutability: true,
});

export const TabState = selector({
  key: "TAB_STATE",
  get(opts) {
    return opts.get(AppState).tab;
  },
  set(opts, newValue) {
    opts.set(AppState, (prev) => ({
      ...prev,
      tab: newValue as ActionType,
    }));
  },
});

export const RECORD_ID_SYNC = "RECORD_ID_SYNC";

export const RecordIdState = atom<string | null | undefined>({
  key: "RECORD_ID_STATE",
  default: null,
  effects: [
    syncEffect({ storeKey: RECORD_ID_SYNC, refine: nullable(string()) }),
  ],
});
