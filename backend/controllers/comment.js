const { dbCon } = require("../configuration");
const createError = require("http-errors");

const getComments = (req, res, next) => {
  //console.log(req.params.postId);
  let queryStr =
    "SELECT * FROM comments WHERE comment_post_id=? ORDER BY comment_date DESC ";
  dbCon.query(queryStr, [req.params.postId], (err, result) => {
    if (err) {
      res.json({ status: 400, message: "Error to fetch comments" });
    } else {
      res.json({ status: 200, results: result });
    }
  });
};

const createComment = (req, res, next) => {
  //ToDo: validate data
  const data = req.body;
  if (Object.entries(data).length === 0) {
    return next(createError(400));
  }
  //console.log(data);
  dbCon.query("INSERT INTO comments SET ?", data, (err, result) => {
    //console.log(err);
    if (err) {
      res.json({ status: 400, message: "Error to create comment" });
    } else {
      res.json({ status: 200, results: result });
    }
  });
};
module.exports = {
  getComments,
  createComment,
};
