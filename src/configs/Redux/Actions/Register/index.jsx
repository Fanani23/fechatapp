import axios from "axios";
import Swal from "sweetalert2";

export const registerUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_BUILD_API}/users/register`,
      data
    );
    const user = res.data;
    console.log("user", user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    Swal.fire("Success", "Register success", "success");
    navigate("/login");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Register failed", "error");
  }
};
