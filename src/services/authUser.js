import axios from "axios";
import baseURL from "../utils/baseURL";
import { addUserAction, getUserByEmailPasswordAction } from "../store/action/userAction";
import { closeLoading } from "../store/action/loaderAction";

const getUserByEmailPassword = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${baseURL}/getUser?password=${data.password}&email=${data.email}`,
        {
          email: data.email,
          password: data.password,
        }
      )
      .then((response) => {
        dispatch(getUserByEmailPasswordAction(response.data));
        dispatch(closeLoading());
      });
  };
};

const addUser = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${baseURL}/addUser?name=${data.name}&password=${data.password}&email=${data.email}`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      )
      .then((response) => {
        dispatch(addUserAction(response.data));
        dispatch(closeLoading());
      });
  };
};

export { getUserByEmailPassword, addUser };
