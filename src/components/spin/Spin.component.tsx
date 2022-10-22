import ReactLoading from "react-loading";
import { useRecoilValue } from "recoil";
import SpinLoaderState from "./spin.atom";

function SpinLoader() {
  const spining = useRecoilValue(SpinLoaderState);

  if (!spining) {
    return null;
  }

  return (
    <div className="Pos(a) End(2rem) T(2rem)">
      <ReactLoading type="spin" color="#ff4c29" width={40} />
    </div>
  );
}

export default SpinLoader;
