import React from "react";
import "./auth.css";
import signInImage from "../../assets/signin.png";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserByEmailPassword } from "../../services/authUser";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import { openLoading } from "../../store/action/loaderAction";

function Auth() {
  const dispatch = useDispatch();
  const [signUp, setSignUp] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const user = useSelector((state) => state.userReducer.user);
  const loader = useSelector((state) => state.loaderReducer.loader);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInUser = async () => {
    const req = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(openLoading());
    dispatch(addUser(req));
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogInUser = async () => {
    const req = {
      email: email,
      password: password,
    };
    dispatch(openLoading());
    dispatch(getUserByEmailPassword(req));
    setEmail("");
    setPassword("");
  };

  React.useEffect(() => {
    if (user.id !== null) {
      if(location && location.state == null){
        navigate(`/blogs`);
      }else {
        navigate(`${location.state.from.pathname}`);
      }
     
    }
  }, [user.id]);

  return loader ? (
    <CustomLoader />
  ) : (
    <div className="authContainer">
      <img src={signInImage} className="authImage" />
      {signUp ? (
        <div className="authBox">
          <p className="authTitle">Brew Up...</p>
          <p className="authError">{user.message}</p>
          <input
            type="text"
            className="authInput"
            placeholder="Full Name"
            autoComplete="new-password"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="authInput"
            placeholder="Email"
            autoComplete="new-password"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="authInput"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="authButton" onClick={() => handleSignInUser()}>
            {"Stir it -->"}
          </div>
          <p className="authFooter">
            Already have a account,{" "}
            <span className="authChange" onClick={() => setSignUp(false)}>
              Brew In
            </span>
          </p>
        </div>
      ) : (
        <div className="authBox">
          <p className="authTitle">Brew In...</p>
          <p className="authError">{user.message}</p>
          <input
            type="text"
            className="authInput"
            placeholder="Email"
            autoComplete="new-password"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="authInput"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="authButton" onClick={() => handleLogInUser()}>
            {"Stir it -->"}
          </div>
          <p className="authFooter">
            Don't have a account,{" "}
            <span className="authChange" onClick={() => setSignUp(true)}>
              Brew Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Auth;
