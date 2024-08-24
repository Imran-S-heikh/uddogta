import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ButtonRipple from "../components/buttons/ButtonRipple.component";
import { auth } from "../firebase";
import Loading from "../molecules/Loading.mole";
import { AppState, UserState } from "../state/app.atom";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);
  const setAppState = useSetRecoilState(AppState);
  const user = useRecoilValue(UserState);

  const handleLogin = () => {
    signInWithGoogle().then(() => {
      setAppState((pre) => ({
        ...pre,
        page: "RECORD",
      }));
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (Boolean(user)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Flex(1) Ai(c) D(f) Jc(c) H(100%) Mih(100vh)">
      <ButtonRipple
        onClick={handleLogin}
        className="C(#eee) Fx(1) H(4rem) Bdrs(1rem) Fz(1.8rem) Fw(600) Bgc(#ff4c29) Maw(maxc) Px(3rem)"
      >
        Log In With Google
      </ButtonRipple>
    </div>
  );
}

export default LoginPage;
