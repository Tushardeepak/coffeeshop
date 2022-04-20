import { Button } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  getStory,
  editStory,
  deleteStory,
  addLike,
} from "../../services/stories";
import "./blogpage.css";
import CustomLoader from "../CustomLoader";
import { closeLoading, openLoading } from "../../store/action/loaderAction";
import logo from "../../assets/logo.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function BlogPage() {
  const params = useParams();
  const [data, setData] = React.useState({});
  const [change, setChange] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [story, setStory] = React.useState("");
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const user = useSelector((state) => state.userReducer.user);
  const loader = useSelector((state) => state.loaderReducer.loader);
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const titleAreaRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deleteStory(id);
    navigate("/blogs");
  };

  const handleSave = (id) => {
    const data = {
      title: title,
      story: story,
      id: id,
    };
    editStory(data);
    setChange(false);
  };

  const getStoryData = async () => {
    dispatch(openLoading());
    const d = await getStory(params.id);
    setTitle(d.title);
    setStory(d.story);
    if (d.likes == ",") {
      setLikes(0);
    } else {
      const count = d.likes.split(",").length - 1;
      setLikes(count);
    }
    if (d.likes.includes(user.id)) {
      setLiked(true);
    }
    setData(d);
    dispatch(closeLoading());
  };
  React.useEffect(() => {
    getStoryData();
  }, []);

  React.useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";

    titleAreaRef.current.style.height = "0px";
    const scrollHeightTitle = titleAreaRef.current.scrollHeight;
    titleAreaRef.current.style.height = scrollHeightTitle + "px";
  }, [data.story]);

  const handleLike = async (id) => {
    const str = id + "," + data.likes;
    await addLike(data.id, str);
    setLikes(likes + 1);
    setLiked(true);
  };

  const handleDislike = async (id) => {
    const arr = data.likes.split(",");
    const updatedArr = arr.filter((data) => data != id);
    let str = "";
    updatedArr.map((data) => {
      str = str + "," + data;
    });
    await addLike(data.id, str);
    setLikes(likes - 1);
    setLiked(false);
  };

  return (
    <div className="blogPageContainer">
      <img src={logo} className="blogPageLogo" />
      {loader ? (
        <CustomLoader />
      ) : (
        <div className="blogPageBox">
          {change ? (
            <Button
              className="blogPageButton"
              onClick={() => handleSave(data.id)}
            >
              Save
            </Button>
          ) : (
            <div></div>
          )}
          <div className="blogPageHeader">
            <div className="blogPageTitleBox">
              <textarea
                ref={titleAreaRef}
                style={{ outline: user.email !== data.email && "none" }}
                type="text"
                className="blogPageTitle"
                value={title}
                onChange={(e) => {
                  if (data.email === user.email) {
                    setChange(true);
                    setTitle(e.target.value);
                  }
                }}
              />
              {liked ? (
                <p className="blogPageLikeBtn">
                  <ThumbUpIcon
                    className="thumbUp"
                    onClick={() => handleDislike(user.id)}
                  />{" "}
                  {likes}
                </p>
              ) : (
                <p className="blogPageLikeBtn">
                  <ThumbUpOutlinedIcon
                    className="thumbUp"
                    onClick={() => handleLike(user.id)}
                  />{" "}
                  {likes}
                </p>
              )}
              <div className="blogPageAuthorBox">
                <p className="blogPageAuthor">By {data.author}</p>
                <div className="blogPageDateBox">
                  <p className="blogPageDate">{data.date}</p>
                  {data.email === user.email && (
                    <DeleteForeverIcon
                      className="blogPageDelete"
                      onClick={() => handleDelete(data.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="blogPageMain">
            <textarea
              ref={textareaRef}
              style={{ outline: user.email !== data.email && "none" }}
              value={story}
              className="blogPageStory"
              onChange={(e) => {
                if (data.email === user.email) {
                  setChange(true);
                  setStory(e.target.value);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
