import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
