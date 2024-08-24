import React, { Children, ReactElement, ReactNode, useContext } from "react";
import { RowContext } from "./TableBody.component";

interface Props {
  component?: "th" | "td";
  children?: ReactNode;
  className?: string;
}

function TableCell({ component = "th", ...others }: Props): ReactElement {
  return React.createElement(component, others);
}

type element = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;
function handleElement(
  el: element,
  getValue: (arg: string | number) => any,
  formatter: (val: number | string) => number | string
) {
  const {
    type,
    props: { "data-key": dataKey, "data-map": dataMap = "children", ...others },
  } = el;

  if (dataKey === undefined) {
    return el;
  }

  const value = getValue(dataKey);

  if (typeof value === "string" || typeof value === "number") {
    return React.createElement(type, {
      ...others,
      [dataMap]: formatter(value),
    });
  }

  return el;
}

interface DynamicTableCellType {
  children: ReactElement | ReactElement[];
  className?: string;
  wraper?: boolean;
  wraperClass?: string;
  component?: "th" | "td";
  formatter?: (val: number | string) => number | string;
}

function DynamicTableCell({
  children,
  className,
  component = "th",
  formatter = (val) => val,
}: DynamicTableCellType) {
  const row = useContext(RowContext);

  const sendValue = (key: string | number) => {
    return row[key];
  };

  return React.createElement(component, {
    children: Children.map(children, (el) =>
      handleElement(el, sendValue, formatter)
    ),
    className: className,
  });
}

TableCell.Dynamic = DynamicTableCell;

export default TableCell;
