import React from "react";
import CommentItem from "./CommentItem";
import { nestedTree } from "./common/helper";

function ListItem({ item }) {
  let children = null;
  if (item.children && item.children.length) {
    children = (
      <div className="comments">
        {item.children.map((i) => (
          <ListItem item={i} key={i.comment_id} />
        ))}
      </div>
    );
  }

  return (
    <div className="comment">
      {/* {item.comment_author} */}
      <CommentItem key={item.comment_id} comment={item} isChild={false} />
      {children}
    </div>
  );
}

const CommentList = ({ comments }) => {
  if (comments) {
    comments = nestedTree(comments);
    return (
      <div className="ui comments">
        {comments.map((i) => (
          <ListItem item={i} key={i.comment_id} />
        ))}
      </div>
    );
  }
};
/*const CommentList = ({ comments }) => {
  if (comments) {
    console.log(comments);
    comments = nestedTree(comments);
    console.log(comments);
    const renderedList = comments.map((comment) => {
      //let isParent = (comment.child)true
      let children = null;
      if (comment.children.length > 0) {
        children = comment.children.map((childComment) => (
          //console.log(childComment)
          <CommentItem
            key={childComment.comment_id}
            comment={childComment}
            isChild={true}
          />
        ));
      }
      return (
        <div className="comment">
          <CommentItem
            key={comment.comment_id}
            comment={comment}
            isChild={false}
          />
          <div className="child">{children}</div>
        </div>
      );
    });

    return <div className="ui comments">{renderedList}</div>;
  }
};*/

export default CommentList;
