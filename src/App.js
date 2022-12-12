import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
