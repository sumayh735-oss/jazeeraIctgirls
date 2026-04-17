const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  getPosts,
  createPost,
  reactPost,
  addComment,
  addReply,
  deletePost,
  editPost,
  editComment,
  deleteComment,
  reactComment,
  getNotifications,
  markAsRead
} = require("../controllers/community.controller");

//////////////////////////////////////////////////
// POSTS
//////////////////////////////////////////////////

router.get("/posts", getPosts);
router.post("/posts", verifyToken, createPost);
router.post("/posts/:postId/react", verifyToken, reactPost);
router.put("/posts/:postId", verifyToken, editPost);
router.delete("/posts/:postId", verifyToken, deletePost);

//////////////////////////////////////////////////
// COMMENTS
//////////////////////////////////////////////////

router.post("/posts/:postId/comment", verifyToken, addComment);
router.post("/posts/:postId/comments/:commentId/reply", verifyToken, addReply);

router.put("/comments/:commentId", verifyToken, editComment);
router.delete("/comments/:commentId", verifyToken, deleteComment);

// 🔥 IMPORTANT (fix 404)
router.post("/comments/:commentId/react", verifyToken, reactComment);

//////////////////////////////////////////////////
// NOTIFICATIONS
//////////////////////////////////////////////////

router.get("/notifications", verifyToken, getNotifications);
router.put("/notifications/:id", verifyToken, markAsRead);

module.exports = router;
