import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import socketIO from "socket.io-client";
import Swal from "sweetalert2";
import Splash from "../pages/Splash";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forgot from "../pages/Auth/Forgot";
import Main from "../pages/Main";

const Router = () => {
  // const socket = socketIO.connect(`${process.env.REACT_APP_BUILD_API}`);

  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login first", "error");
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
