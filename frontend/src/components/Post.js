import React from "react";
import PropTypes from "prop-types";
import blog from "../apis/blog";
import BlogList from "./BlogList";
import WithRouter from "./WithRouter";
import { connect } from "react-redux";
import {
  saveBlogPosts,
  saveTotalBlogPosts,
  showLoader,
  hideLoader,
} from "../actions";
import PaginationLinks from "./common/PaginationLinks";
import history from "./common/history";
import { Link } from "react-router-dom";
import PostFormModal from "./PostFormModal";
import Loader from "./common/Loader";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedBlog: null, selectedPage: 1, showModal: false };
  }

  componentDidMount() {
    const { getBlogPosts } = this.props;
    let targetPage = this.props.router.params.page ?? this.state.selectedPage;
    this.setState({ selectedPage: Number(targetPage) });
    getBlogPosts(targetPage);
  }

  handlePageChange = (pageNumber) => {
    const { getBlogPosts } = this.props;
    //console.log(pageNumber);
    this.setState({ selectedPage: pageNumber });
    getBlogPosts(pageNumber);
    history.push("/posts/" + pageNumber);
  };

  onBlogSelect = (event) => {};

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ showModal: true });
  };

  handleFormSubmit = (postData) => {
    const { submitForm, getBlogPosts } = this.props;
    submitForm(postData);
    getBlogPosts(this.state.selectedPage);
  };

  handleModalClose = () => {
    console.log("Hide Modal:");
    this.setState({ showModal: false });
  };

  render() {
    const { blogPosts, totalPosts, loader } = this.props;
    //console.log(this.state.selectedPage);
    //console.log(this.state.showModal);
    if (loader) {
      return <Loader />;
    }
    return (
      <div className="ui masthead vertical segment">
        <div className="ui container">
          <PostFormModal
            showModal={this.state.showModal}
            onHide={this.handleModalClose}
            handleFormSubmit={this.handleFormSubmit}
          />
          <div className="ui grid container">
            <div className="four wide column">
              <Link to="/" onClick={this.handleClick} data-tip="Add Post">
                <i className="fa fa-plus" /> Add Post
              </Link>
            </div>
            <div className="twelve wide column">
              <PaginationLinks
                handlePageChange={this.handlePageChange}
                paginationPath={"/posts"}
                totalListItems={totalPosts}
                activePage={this.state.selectedPage}
              />
            </div>
            <div className="sixteen wide column">
              <BlogList onBlogSelect={this.onBlogSelect} blogs={blogPosts} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.defaultProps = {
  loader: false,
};
Post.propTypes = {
  getBlogPosts: PropTypes.func.isRequired,
  blogPosts: PropTypes.array.isRequired,
  totalPosts: PropTypes.number.isRequired,
  submitForm: PropTypes.func.isRequired,
  loader: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  blogPosts: state.blogPosts,
  totalPosts: state.totalPosts,
  loader: state.loader.status,
});
const mapDispatchToProps = (dispatch) => ({
  getBlogPosts: (page) => {
    dispatch(showLoader(true));
    blog
      .get("/posts/" + page)
      .then((response) => {
        //return response.data.results;
        //console.log(response.data.results);
        dispatch(saveBlogPosts(response.data.results));
        dispatch(saveTotalBlogPosts(response.data.totalPosts));
        dispatch(hideLoader(false));
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  submitForm: (data) => {
    blog
      .post("/createPost", data)
      .then((response) => {
        //console.log(response.data.results);
        //dispatch
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Post));
