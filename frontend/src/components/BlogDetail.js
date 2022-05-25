import React from "react";

const BlogDetail = ({ blog }) => {
  if (blog) {
    return (
      <div>
        <div className="ui segment">
          <h4 className="ui header">{blog.post_title}</h4>
          <p>{blog.post_content}</p>
        </div>
      </div>
    );
  }
};

export default BlogDetail;
