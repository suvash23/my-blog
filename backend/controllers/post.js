const { dbCon } = require("../configuration");
const createError = require("http-errors");

const getPosts = (req, res, next) => {
  //console.log(dbCon);
  const pageNum = parseInt(req.params.page);

  if (isNaN(pageNum)) {
    return next(createError(400));
  }

  const postsToSkip = (pageNum - 1) * 5;
  let totalPosts = 0;
  let countQueryStr = "SELECT count(*) as total_post FROM posts ";
  dbCon.query(countQueryStr, (err, result) => {
    if (err) {
      //console.log(err);
    } else {
      //console.log(result[0].total_post);
      totalPosts = result[0].total_post;
    }
  });
  let queryStr =
    "SELECT * FROM posts ORDER BY post_date DESC LIMIT " + postsToSkip + ", 5 ";
  dbCon.query(queryStr, (err, result) => {
    if (err) {
      res.json({ status: 400, message: "Error to fetch records" });
    } else {
      res.json({ status: 200, results: result, totalPosts: totalPosts });
    }
  });
};

const getOnePost = (req, res, next) => {
  if (isNaN(parseInt(req.params.id))) {
    return next(createError(400));
  }
  dbCon.query(
    "SELECT * FROM posts WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json({ status: 400, message: "Error to fetch record" });
      } else {
        res.json({ status: 200, results: result });
      }
    }
  );
};

const createPost = (req, res, next) => {
  //ToDo: validate data
  const data = req.body;
  if (Object.entries(data).length === 0) {
    return next(createError(400));
  }

  dbCon.query("INSERT INTO posts SET ?", data, (err, result) => {
    if (err) {
      res.json({ status: 400, message: "Error to create record" });
    } else {
      res.json({ status: 200, results: result });
    }
  });
};
module.exports = {
  getPosts,
  getOnePost,
  createPost,
};
