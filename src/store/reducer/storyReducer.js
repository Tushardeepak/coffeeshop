const initialState = {
  storyList: [],
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getStories":
      return {
        ...state,
        storyList: [...action.payload],
      };

    default:
      return state;
  }
};

export default storyReducer;