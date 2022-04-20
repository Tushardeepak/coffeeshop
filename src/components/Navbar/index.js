import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../store/action/userAction";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="navbarContainer">
      <div className="navbarBox1">
        <img src={logo} className="navbarLogo" />
        <p className="navbarTitle">The Coffee Shop Stories</p>
      </div>
      <div className="navbarBox2">
        <p className="navbarLinks" onClick={() => navigate("/")}>
          Home
        </p>
        {user && user.id && (
          <p className="navbarLinks" onClick={() => navigate("/blogs")}>
            Blogs
          </p>
        )}
        {user && user.id ? (
          <p
            className="navbarLinks"
            onClick={() => {
              localStorage.setItem("coffeeUser", null);
              dispatch(
                addUserAction({
                  id: null,
                  name: null,
                  email: null,
                  password: null,
                  message: null,
                })
              );
            }}
          >
            Logout
          </p>
        ) : (
          <p className="navbarLinks" onClick={() => navigate("/auth")}>
            Login
          </p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
