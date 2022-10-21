import { ReactElement, ReactNode } from "react";

interface Props<T> {
  children?: ReactElement | ((arg?: T)=>ReactElement);
  value?: T
}

function RenderProp<T>({ children, value }: Props<T>): any {
  if (typeof children === "function") {
    return children(value);
  }

  return children && children;
}

export default RenderProp;
