import React from "react";
import blog from "../apis/blog";
import BlogDetail from "./BlogDetail";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import WithRouter from "./WithRouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  saveBlogPostDetails,
  saveBlogPostComments,
  showLoader,
  hideLoader,
} from "../actions";
import Loader from "./common/Loader";
//import { nest } from "./common/helper";
class PostView extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log(this.props.router.params.postId);
    const { getBlogPost, getBlogPostComment } = this.props;
    getBlogPost(this.props.router.params.postId);
    getBlogPostComment(this.props.router.params.postId);
    //console.log(nest(this.props.blogPostComments));
  }

  render() {
    const { blogPostDetails, blogPostComments, loader } = this.props;

    if (blogPostComments) {
      // console.log(nest(blogPostComments));
    }

    console.log(loader);
    if (loader) {
      return <Loader />;
    }
    return (
      <div className="ui masthead vertical segment">
        <div className="ui container">
          <div className="ui grid container">
            <div className="twelve wide column">
              <BlogDetail blog={blogPostDetails} />
            </div>
            <div className="twelve wide column">
              <CommentForm />
            </div>
            <div className="twelve wide column">
              <CommentList comments={blogPostComments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostView.defaultProps = {
  loader: false,
};

PostView.propTypes = {
  getBlogPost: PropTypes.func.isRequired,
  getBlogPostComment: PropTypes.func.isRequired,
  blogPostDetails: PropTypes.object.isRequired,
  blogPostComments: PropTypes.array.isRequired,
  loader: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  blogPostDetails: state.blogPostDetails,
  blogPostComments: state.blogPostComments,
  loader: state.loader.status,
});
const mapDispatchToProps = (dispatch) => ({
  getBlogPost: (postId) => {
    dispatch(showLoader(true));
    blog
      .get("/post/" + postId)
      .then((response) => {
        dispatch(saveBlogPostDetails(response.data.results[0]));
        dispatch(hideLoader(false));
      })
      .catch((error) => {
        //console.log(error.message);
      });
  },
  getBlogPostComment: (postId) => {
    dispatch(showLoader(true));
    blog
      .get("/comments/" + postId)
      .then((response) => {
        //console.log(nest(response.data.results));
        dispatch(saveBlogPostComments(response.data.results));
        dispatch(hideLoader(false));
      })
      .catch((error) => {
        //console.log(error.message);
      });
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouter(PostView));
