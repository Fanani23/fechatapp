import React from "react";
import style from "./splash.module.css";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className={style.containerSplash}>
        <div className={style.containerImg}>
          <img
            type="button"
            className={style.splashImg}
            src={assets.logoSplash}
            alt="logoSplash"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;
