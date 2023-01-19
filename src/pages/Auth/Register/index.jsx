import React, { useState } from "react";
import style from "./register.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../configs/Redux/Actions/Register";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(username);
    let data = {
      email,
      password,
      username,
    };
    dispatch(registerUser(data, navigate));
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.containerModal}>
        <div className={style.loginModal}>
          <div className="pt-4">
            <div className={style.loginBase}>
              <img
                type="button"
                src={assets.logoBack}
                alt=""
                onClick={() => navigate("/login")}
              />
              <p className={style.loginText}>Register</p>
            </div>
          </div>
          <div>
            <p className={style.welcomeText}>Let's create your account!</p>
          </div>
          <div>
            <form className={style.formBase} action="">
              <div>
                <label className={style.labelText} htmlFor="username">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Name"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
          <div className={style.buttonBase}>
            <button
              type="submit"
              className={style.loginButton}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <div className={style.lineBase}>
            <div>
              <img src={assets.lineLogin} alt="" />
            </div>
            <div>
              <p className={style.withText}>Register with</p>
            </div>
            <div>
              <img src={assets.lineLogin} alt="" />
            </div>
          </div>
          <div className={style.buttonGoogle}>
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
              <p className={style.dontText}>Already have an account?</p>
              <p
                type="button"
                className={style.signText}
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
