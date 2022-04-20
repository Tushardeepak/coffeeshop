const initialState = {
  loader: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        loader: action.payload,
      };

    case "close":
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
};

export default loaderReducer;
