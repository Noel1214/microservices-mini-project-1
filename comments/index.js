const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const data = commentsByPostId[req.params.id] || [];
  console.log(data);
  
  res.status(200).json(data);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentID, content });

  commentsByPostId[req.params.id] = comments;
  res.status(201).json({ success: true });
});

app.listen(4001, () => {
  console.log("listening on 4001\n");
});
