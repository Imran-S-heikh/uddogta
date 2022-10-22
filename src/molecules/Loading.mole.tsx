import clsx from "clsx";
import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="Pos(f) Mih(100vh) Top(0) Start(0) End(0) B(0) D(f) Jc(c) Ai(c)">
      <ReactLoading type="spinningBubbles" />
    </div>
  );
}

interface LoadingSmallProps {
  type?: LoadingType;
  className?: string;
  color?: string;
}

function LoadingSmall({ type, className,color }: LoadingSmallProps) {
  return (
    <div className={clsx(className, "D(f) Jc(c) Ai(c) H(100%)")}>
      <ReactLoading type={type} color={color} />
    </div>
  );
}

Loading.Small = LoadingSmall;

export default Loading;
