import * as type from "../constants/actionTypes";
//import { fromJS } from "immutable";

const initialState = {
  totalPosts: 0,
  blogPosts: [],
  blogPostDetails: {},
  blogPostComments: [],
  loader: { status: false },
};

function rootReducer(state = initialState, action) {
  if (action.type === type.SAVE_TOTAL_BLOG_POSTS) {
    return Object.assign({}, state, {
      totalPosts: action.totalPosts,
    });
  }

  if (action.type === type.SAVE_BLOG_POSTS) {
    return Object.assign({}, state, {
      blogPosts: action.blogPosts,
    });
  }
  if (action.type === type.SAVE_BLOG_POST_DETAILS) {
    //state.blogPosts.concat(action.blogPosts);
    return Object.assign({}, state, {
      blogPostDetails: action.blogPostDetails,
    });
  }
  if (action.type === type.SAVE_BLOG_POST_COMMENTS) {
    //state.blogPosts.concat(action.blogPosts);
    return Object.assign({}, state, {
      blogPostComments: action.blogPostComments,
    });
  }
  if (action.type === type.SHOW_LOADER) {
    return Object.assign({}, state, {
      loader: { status: action.status },
    });
  }
  if (action.type === type.HIDE_LOADER) {
    return Object.assign({}, state, {
      loader: { status: action.status },
    });
  }
  return state;
}

export default rootReducer;
