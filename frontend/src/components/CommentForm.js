import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import blog from "../apis/blog";
import WithRouter from "./WithRouter";
import { saveBlogPostComments, showLoader, hideLoader } from "../actions";
//import Loader from "./common/Loader";

class CommentForm extends React.Component {
  authorNameRef = React.createRef();
  commentContentRef = React.createRef();
  handleSubmit = (event) => {
    event.preventDefault();

    const { submitForm, getBlogPostComment } = this.props;

    let commentData = {
      comment_post_id: this.props.router.params.postId,
      comment_author: this.authorNameRef.current.value,
      comment_content: this.commentContentRef.current.value,
      comment_parent: 0,
    };

    submitForm(commentData);
    getBlogPostComment(this.props.router.params.postId);
  };
  render() {
    return (
      <div className="content" style={{ marginTop: 20, marginBottom: 20 }}>
        <form className="ui reply form" onSubmit={this.handleSubmit}>
          <h4 className="ui dividing header">Add a Comment</h4>
          <div className="field">
            <input
              type="text"
              name="comment_author"
              required
              ref={this.authorNameRef}
              placeholder="Name"
            ></input>
          </div>
          <div className="field">
            <textarea
              name="comment_content"
              required
              ref={this.commentContentRef}
              placeholder="Comment"
            ></textarea>
          </div>
          <button
            className="ui button blue submit"
            type="submit"
            style={{ marginTop: 10 }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
CommentForm.defaultProps = {
  loader: false,
};
CommentForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  getBlogPostComment: PropTypes.func.isRequired,
  loader: PropTypes.bool,
};

const mapStateAsProps = (state) => ({});

const mapDispatcherAsProps = (dispatch) => ({
  submitForm: (data) => {
    //dispatch(showLoader(true));
    blog
      .post("/createComment", data)
      .then((response) => {
        //return response.data.results;
        //dispatch(hideLoader(false));
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  getBlogPostComment: (postId) => {
    dispatch(showLoader(true));
    blog
      .get("/comments/" + postId)
      .then((response) => {
        dispatch(saveBlogPostComments(response.data.results));
        dispatch(hideLoader(false));
      })
      .catch((error) => {
        //console.log(error.message);
      });
  },
});

export default connect(
  mapStateAsProps,
  mapDispatcherAsProps
)(WithRouter(CommentForm));

//export default CommentForm;
