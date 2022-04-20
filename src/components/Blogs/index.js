import { Button } from "@mui/material";
import React from "react";
import AddBlog from "../AddBlog";
import Blog from "./Blog";
import "./blogs.css";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../services/stories";
import { openLoading } from "../../store/action/loaderAction";
import CustomLoader from "../CustomLoader";

function Blogs() {
  const [expand, setExpand] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const stories = useSelector((state) => state.storyReducer.storyList);
  const loader = useSelector((state) => state.loaderReducer.loader);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(openLoading());
    dispatch(getStories());
  }, []);

  return (
    <div className="blogsContainer">
      <div className="blogsBox">
        <div className="blogsHeader">
          <p className="blogsTitle">Coffee Jars...</p>
          <input
            type="text"
            className="blogsSearchInput"
            placeholder="Search your favorite coffee"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="blogsAddBlog">
          {!expand && (
            <Button
              className="blogsAddBlogBtn"
              onClick={() => setExpand(!expand)}
            >
              Add Jar
            </Button>
          )}
          <AddBlog expand={expand} setExpand={setExpand} />
        </div>
        {loader ? (
          <CustomLoader />
        ) : (
          <div className="blogsMain">
            {stories
              ?.filter((data) => {
                if (search === "") {
                  return data;
                } else if (
                  data.title
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return data;
                } else if (
                  data.author
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return data;
                } else return null;
              })
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
