const express = require("express");
const router = express.Router();
const { getPosts, getOnePost, createPost } = require("../controllers");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the all posts route
router.get("/posts/:page", getPosts);

// define the single post route
router.get("/post/:id", getOnePost);

//define create post route
router.post("/createPost", createPost);

module.exports = router;
