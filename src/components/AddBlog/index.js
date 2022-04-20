import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStory } from "../../services/stories";
import { openLoading } from "../../store/action/loaderAction";
import "./addblog.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function AddBlog({ expand, setExpand }) {
  const user = useSelector((state) => state.userReducer.user);
  const [title, setTitle] = React.useState("");
  const [story, setStory] = React.useState("");
  const dispatch = useDispatch();

  const handleAddStory = () => {
    const data = {
      title: title,
      story: story,
      author: user.name,
      date: `${monthNames[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`,
      email: user.email,
    };
    dispatch(openLoading())
    setTitle("");
    setStory("");
    dispatch(addStory(data));
    setExpand(false);
  };
  return (
    <div className={`addBlogContainer ${expand && "addBlogContainerExpand"}`}>
      <div className="addBlogHeader">
        <input
          type="text"
          className="addBlogTitle"
          placeholder="Add Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="addBlogButton" onClick={handleAddStory}>
          Pour Over
        </Button>
      </div>

      <textarea
        type="text"
        className="addBlogStory"
        placeholder="Write Story"
        onChange={(e) => setStory(e.target.value)}
      />
    </div>
  );
}

export default AddBlog;
