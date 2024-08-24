import clsx from "clsx";
import React, { CSSProperties, ReactNode, useEffect } from "react";
import Portal from "../portal/Portal.component";
import "./backdrop.style.scss";

interface Props {
  children: ReactNode;
  className?: string;
  open?: boolean;
  style?: CSSProperties;
}

const Backdrop = React.forwardRef(
  ({ children, className, open, style }: Props, ref: any) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [open]);

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <div className={clsx("backdrop", className)} ref={ref} style={style}>
          {children}
        </div>
      </Portal>
    );
  }
);

export default Backdrop;
