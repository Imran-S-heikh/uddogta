export type IconsId =
  | "box-arrow-right"
  | "delete"
  | "expand-more";

export type IconsKey =
  | "BoxArrowRight"
  | "Delete"
  | "ExpandMore";

export enum Icons {
  BoxArrowRight = "box-arrow-right",
  Delete = "delete",
  ExpandMore = "expand-more",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.BoxArrowRight]: "61697",
  [Icons.Delete]: "61698",
  [Icons.ExpandMore]: "61699",
};
