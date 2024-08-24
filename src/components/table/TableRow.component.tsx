import React, { ReactElement } from "react";

interface Props {
  children: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
}

function TableRow({ children, className, style }: Props): ReactElement {
  return (
    <tr className={className} style={style}>
      {children}
    </tr>
  );
}

TableRow.displayName = "TableRow";

export default TableRow;
