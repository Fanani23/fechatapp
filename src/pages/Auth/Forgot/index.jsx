import React from "react";
import style from "./forgot.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

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
              <p className={style.loginText}>Forgot Password</p>
            </div>
          </div>
          <div>
            <p className={style.welcomeText}>
              You'll get messages soon on your e-mail
            </p>
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
                />
              </div>
            </form>
          </div>
          <div className={style.buttonBase}>
            <button type="button" className={style.loginButton}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
