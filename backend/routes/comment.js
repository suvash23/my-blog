const express = require("express");
const router = express.Router();
const { getComments, createComment } = require("../controllers");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the comments list route by post
router.post("/createComment", createComment);

// define the comments list route by post
router.get("/comments/:postId", getComments);

module.exports = router;
