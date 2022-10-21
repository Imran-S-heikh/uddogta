import { ActionType } from "./types/app.type";

export type Filter<T, K> = {
  [Key in Exclude<keyof T, K>]: T[Key];
};

export enum Collections {
  RECORDS = "RECORDS",
  USER_RECORDS = "USER_RECORDS",
  USER_ENTRIES = "USER_ENTRIES",
}

export interface Record {
  id: string;
  name: string;
}

export interface Entry {
  id: string;
  value: number;
  action: ActionType,
  date: number,
  title: string
}
