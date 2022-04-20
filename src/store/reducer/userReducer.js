import { getUserByEmailPassword, addUser } from "../../services/authUser";

let initialUser = {
  user: { id: null, name: null, email: null, password: null, message: null },
};

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case "getUserByEmailPassword":
      localStorage.setItem("coffeeUser", JSON.stringify(action.payload));
      return {
        ...state,
        user: { ...action.payload },
      };

    case "addUser":
      localStorage.setItem("coffeeUser", JSON.stringify(action.payload));
      return {
        ...state,
        user: { ...action.payload },
      };

    default:
      return state;
  }
};

export default userReducer;
