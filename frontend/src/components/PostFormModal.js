import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import WithRouter from "./WithRouter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PostFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDate: "",
    };
  }
  postTitleRef = React.createRef();
  postContentRef = React.createRef();

  componentDidUpdate() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  scrollRef = React.createRef();

  handleSubmit = (event) => {
    event.preventDefault();

    const { handleFormSubmit, onHide } = this.props;

    let postData = {
      post_title: this.postTitleRef.current.value,
      post_content: this.postContentRef.current.value,
      post_date: this.state.postDate,
    };

    handleFormSubmit(postData);
    onHide();
  };
  handleDateChange = (date) => {
    this.setState({ postDate: date });
  };
  render() {
    //console.log("Modal:" + this.props.showModal);
    return (
      <Modal
        dialogClassName="post-add-modal"
        show={this.props.showModal}
        onHide={this.props.onHide}
      >
        <form className="ui post form" onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="field">
              <input
                type="text"
                name="post_title"
                required
                ref={this.postTitleRef}
                placeholder="Title"
              ></input>
            </div>
            <div className="field">
              <textarea
                name="comment_content"
                required
                ref={this.postContentRef}
                placeholder="Content"
              ></textarea>
            </div>
            <div className="field">
              <DatePicker
                placeholderText="YYYY-MM-DD"
                className="form-control"
                calendarClassName="blog-datepicker"
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                selected={
                  this.state.postDate ? this.state.postDate : new Date()
                }
                onChange={this.handleDateChange}
              />
            </div>
            <div ref={this.scrollRef} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Create</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

PostFormModal.defaultProps = {
  showModal: false,
  title: "Add Post",
};

PostFormModal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

const mapStateAsProps = (state) => ({});

const mapDispatcherAsProps = (dispatch) => ({});

export default connect(
  mapStateAsProps,
  mapDispatcherAsProps
)(WithRouter(PostFormModal));
