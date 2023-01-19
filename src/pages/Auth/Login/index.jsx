import React, { useState } from "react";
import style from "./login.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../configs/Redux/Actions/Login";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginUser(data, navigate));
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.containerModal}>
        <div className={style.loginModal}>
          <div className="pt-4">
            <p className={style.loginText}>Login</p>
          </div>
          <div>
            <p className={style.welcomeText}>Hi, Welcome back!</p>
          </div>
          <div>
            <form className={style.formBase} action="">
              <div>
                <label className={style.labelText} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={style.labelText} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div>
            <p
              type="button"
              className={style.forgotText}
              onClick={() => navigate("/forgot")}
            >
              Forgot password?
            </p>
          </div>
          <div className={style.buttonBase}>
            <button
              type="submit"
              className={style.loginButton}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className={style.lineBase}>
            <div>
              <img src={assets.lineLogin} alt="" />
            </div>
            <div>
              <p className={style.withText}>Login with</p>
            </div>
            <div>
              <img src={assets.lineLogin} alt="" />
            </div>
          </div>
          <div className={style.buttonBase}>
            <button type="button" className={style.googleButton}>
              <div className="pt-2">
                <img src={assets.logoGoogle} alt="" />
              </div>
              <div className="pt-2">
                <p className={style.googleText}>Google</p>
              </div>
            </button>
          </div>
          <div>
            <div className={style.alreadyBase}>
              <p className={style.dontText}>Don't have an account?</p>
              <p
                type="button"
                className={style.signText}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
