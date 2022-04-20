import { combineReducers } from "redux";
import userReducer from "./reducer/userReducer";
import storyReducer from './reducer/storyReducer';
import loaderReducer from './reducer/loaderReducer';


const combineReducer = combineReducers({
    userReducer,
    storyReducer,
    loaderReducer
})

export default combineReducer