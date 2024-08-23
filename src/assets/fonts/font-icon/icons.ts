export type IconsId =
  | "box-arrow-right"
  | "calendar-minus"
  | "calendar-plus"
  | "close"
  | "delete"
  | "expand-more";

export type IconsKey =
  | "BoxArrowRight"
  | "CalendarMinus"
  | "CalendarPlus"
  | "Close"
  | "Delete"
  | "ExpandMore";

export enum Icons {
  BoxArrowRight = "box-arrow-right",
  CalendarMinus = "calendar-minus",
  CalendarPlus = "calendar-plus",
  Close = "close",
  Delete = "delete",
  ExpandMore = "expand-more",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.BoxArrowRight]: "61697",
  [Icons.CalendarMinus]: "61698",
  [Icons.CalendarPlus]: "61699",
  [Icons.Close]: "61700",
  [Icons.Delete]: "61701",
  [Icons.ExpandMore]: "61702",
};
