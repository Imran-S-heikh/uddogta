import { collection } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import ButtonRipple from "../components/buttons/ButtonRipple.component";
import { auth } from "../firebase";
import Loading from "../molecules/Loading.mole";
import { AppState } from "../state/app.atom";

function LoginPage() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const setAppState = useSetRecoilState(AppState);

  const handleLogin = () => {
    signInWithGoogle().then((data) => {
      console.log(data);
      setAppState((pre) => ({
        ...pre,
        page: "RECORD",
      }));
    });
  };

  if (loading) {
    return <Loading />;
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
