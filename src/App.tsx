import { Suspense } from "react";
import "./App.css";
import Home from "./pages/Home.page";
import Record from "./pages/Record";
import LoginPage from "./pages/Login.page";
import Loading from "./molecules/Loading.mole";
import { Route, Routes } from "react-router-dom";
import SpinLoader from "./components/spin/Spin.component";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="Pos(r)">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/records/*"
            element={
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Record />} />
              </Routes>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>

        <SpinLoader />
      </div>
    </Suspense>
  );
}

export default App;
