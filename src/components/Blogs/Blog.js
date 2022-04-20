import React from "react";
import "./blogs.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useNavigate } from "react-router-dom";

function Blog({ blog }) {
  const navigate = useNavigate();
  return (
    <div className="blogBox" onClick={() => navigate(`/blogs/${blog.id}`)}>
      <p className="blogTitle">
        {blog.title} <span className="blogAuthor">By {blog.author}</span>
      </p>
      <div className="blogStoryBox">
        <p className="blogStory">
          {blog.story
            .substr(0, 300)
            .substr(
              0,
              Math.min(
                blog.story.substr(0, 300).length,
                blog.story.substr(0, 300).lastIndexOf(" ")
              )
            )}
          ...
        </p>
      </div>
      <div className="blogFooter">
        <p className="blogDate">{blog.date}</p>
      </div>
    </div>
  );
}

export default Blog;
