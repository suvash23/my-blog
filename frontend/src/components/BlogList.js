import React from "react";
import BlogItem from "./BlogItem";
import Loader from "./common/Loader";

const BlogList = ({ blogs, onBlogSelect }) => {
  if (!blogs) {
    return <Loader />;
  }
  const renderedList = blogs.map((blog) => {
    return <BlogItem key={blog.id} onBlogSelect={onBlogSelect} blog={blog} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default BlogList;
