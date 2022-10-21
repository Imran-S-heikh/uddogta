import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { atom } from "recoil";
import { auth } from "../firebase";

interface PageRoute {
  id: string;
  title: string;
  details: string;
  path: string;
}

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

export interface AppState {
  page: Routes;
}

export const AppState = atom<AppState>({
  key: "APP_STATE",
  default: {
    page: "RECORDS",
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
