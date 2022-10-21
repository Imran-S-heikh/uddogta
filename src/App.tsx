import { Suspense } from "react";
import "./App.css";
import Home from "./pages/Home.page";
import Record from "./pages/Record.page";
import LoginPage from "./pages/Login.page";
import Loading from "./molecules/Loading.mole";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="">
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
      </div>
    </Suspense>
  );
}

export default App;
