import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import BlogPage from "./components/Blogs/BlogPage";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from "react-redux";
import { addUserAction } from "./store/action/userAction";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem("coffeeUser") !== null) {
      dispatch(addUserAction(JSON.parse(localStorage.getItem("coffeeUser"))));
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <Blogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PrivateRoute>
              <BlogPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
