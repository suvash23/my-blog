const { dbCon } = require("../configuration");
const createError = require("http-errors");

const getComments = (req, res, next) => {
  //console.log(req.params.postId);
  let queryStr = `WITH RECURSIVE generation AS (
    SELECT comment_id, comment_post_id,
        comment_author, comment_content, comment_date,
        comment_parent,
        0 AS generation_number
    FROM comments
    WHERE comment_parent IS NULL
 
UNION ALL
 
    SELECT child.comment_id, child.comment_post_id,
        child.comment_author,
    child.comment_content, child.comment_date,
        child.comment_parent,
        generation_number+1 AS generation_number
    FROM comments child
    JOIN generation g
      ON g.comment_id = child.comment_parent
)
select * from ( 
SELECT comment_id, comment_post_id, comment_author, comment_content, comment_date, comment_parent, generation_number
FROM generation 
where comment_post_id = ?
ORDER by comment_date desc) as temp ORDER by comment_parent`;
  try {
    dbCon.query(queryStr, [req.params.postId], (err, result) => {
      if (err) {
        res.json({ status: 400, message: "Error to fetch comments" });
      } else {
        res.json({ status: 200, results: result });
      }
    });
  } catch (e) {
    //error
  }
};

const createComment = (req, res, next) => {
  //ToDo: validate data
  const data = req.body;
  if (Object.entries(data).length === 0) {
    return next(createError(400));
  }
  try {
    dbCon.query("INSERT INTO comments SET ?", data, (err, result) => {
      if (err) {
        res.json({ status: 400, message: "Error to create comment" });
      } else {
        res.json({ status: 200, results: result });
      }
    });
  } catch (e) {
    //error
  }
};
module.exports = {
  getComments,
  createComment,
};
