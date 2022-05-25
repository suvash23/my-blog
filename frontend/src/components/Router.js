import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./Post";
import PostView from "./PostView";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Post />} />
      <Route exact path="/posts" element={<Post />} />
      <Route exact path="/posts/:page" element={<Post />} />
      <Route path="/post/:postId" element={<PostView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
