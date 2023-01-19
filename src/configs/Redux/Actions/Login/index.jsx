import axios from "axios";
import Swal from "sweetalert2";

export const loginUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const res = await axios.post(`http://localhost:3003/users/login`, data);
    const user = res.data;
    console.log("user", user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user.data));
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    Swal.fire("Success", "Login success", "success");
    navigate("/main");
  } catch (err) {
    console.log("err", err);
    Swal.fire("Warning", "Login failed", "error");
  }
};
