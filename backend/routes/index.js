const postRouter = require("./post");
const commentRouter = require("./comment");

module.exports = (app) => {
  app.use(postRouter);
  app.use(commentRouter);
};
