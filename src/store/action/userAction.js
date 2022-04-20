export const getUserByEmailPasswordAction = (value) => {
  return {
    type: "getUserByEmailPassword",
    payload: value,
  };
};

export const addUserAction = (value) => {
  return {
    type: "addUser",
    payload: value,
  };
};
