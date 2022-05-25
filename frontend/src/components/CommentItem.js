import "./BlogItem.css";
import React from "react";
import Moment from "react-moment";

const CommentItem = ({ comment, isChild }) => {
  console.log(isChild);
  const postId = comment.comment_post_id;
  return (
    <div className={isChild ? "comments" : "comment"}>
      <a className="ui avatar image" href={postId}>
        <img
          src="https://semantic-ui.com/images/avatar/small/joe.jpg"
          alt="https://semantic-ui.com/images/avatar/small/joe.jpg"
        />
      </a>
      <div className="content">
        <div className="metadata">
          <a className="author" href={postId}>
            {comment.comment_author}
          </a>
          <br />
          <span className="date">
            <Moment format="MMMM DD, YYYY [at] hh:mm A">
              {comment.comment_date}
            </Moment>
          </span>
        </div>
      </div>
      <div className="actions">
        <div className="text" style={{ marginTop: 20 }}>
          {comment.comment_content}
        </div>
        <a className="reply" href={postId}>
          Reply
        </a>
      </div>
    </div>
  );
};

export default CommentItem;
