import "./BlogItem.css";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const BlogItem = ({ blog, onBlogSelect }) => {
  return (
    <div onClick={() => onBlogSelect(blog)} className="blog-item item">
      <div className="content">
        <div className="header">
          <Link to={`/post/${blog.id}`}>{blog.post_title}</Link>
        </div>
        <div className="description">
          <Moment format="MMMM DD, YYYY [at] hh:mm A">{blog.post_date}</Moment>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
