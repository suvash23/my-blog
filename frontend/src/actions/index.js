import * as type from "../constants/actionTypes";

export function saveBlogPosts(blogPosts) {
  return { type: type.SAVE_BLOG_POSTS, blogPosts };
}

export function saveTotalBlogPosts(totalPosts) {
  return { type: type.SAVE_TOTAL_BLOG_POSTS, totalPosts };
}

export function saveBlogPostDetails(blogPostDetails) {
  return { type: type.SAVE_BLOG_POST_DETAILS, blogPostDetails };
}

export function saveBlogPostComments(blogPostComments) {
  return { type: type.SAVE_BLOG_POST_COMMENTS, blogPostComments };
}

export function showLoader(status) {
  return { type: type.SHOW_LOADER, status };
}

export function hideLoader(status) {
  return { type: type.HIDE_LOADER, status };
}
