import clsx from "clsx";
import ReactLoading, { LoadingType } from "react-loading";

function Loading() {
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
