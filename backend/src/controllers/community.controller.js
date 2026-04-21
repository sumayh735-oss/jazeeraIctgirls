const { sequelize } = require('../config/database');
const streamifier = require('streamifier');
const socket = require("../socket");
const cloudinary = require("cloudinary").v2;




// ☁️ UPLOAD TO CLOUDINARY


const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY ERROR:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // 🔥 THIS IS THE FIX
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};



//////////////////////////////////////////////////
// ✅ GET POSTS
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// ✅ GET POSTS (UPDATED)
//////////////////////////////////////////////////
exports.getPosts = async (req, res) => {
  try {
    const [posts] = await sequelize.query(`
      SELECT p.*, u.fullName
      FROM posts p
      LEFT JOIN users u ON p.authorId = u.id
      WHERE p.isDeleted = false
      ORDER BY p.createdAt DESC
    `);

    for (let post of posts) {
      const [comments] = await sequelize.query(`
        SELECT c.*, u.fullName
        FROM comments c
        LEFT JOIN users u ON c.authorId = u.id
        WHERE c.postId = ? AND c.parentCommentId IS NULL
      `, { replacements: [post.id] });

     for (let c of comments || []) {
  const [replies] = await sequelize.query(`
    SELECT c.*, u.fullName
    FROM comments c
    LEFT JOIN users u ON c.authorId = u.id
    WHERE c.parentCommentId = ?
  `, { replacements: [c.id] });

  // ✅ ADD COMMENT REACTIONS
  const [commentReactions] = await sequelize.query(`
    SELECT COUNT(*) as count
    FROM comment_reactions
    WHERE commentId = ?
  `, { replacements: [c.id] });

  c.reactionCount = commentReactions[0].count;

  // 🔥 REPLIES LOOP
  for (let r of replies || []) {
    const [replyReactions] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM comment_reactions
      WHERE commentId = ?
    `, { replacements: [r.id] });

    r.reactionCount = replyReactions[0].count;
  }

  c.replies = replies || [];
}

      post.comments = comments || [];

      // 🔥 IMPORTANT CHANGE
      const [reactions] = await sequelize.query(`
        SELECT r.type,
        COUNT(*) as count,
        GROUP_CONCAT(u.fullName) as users
        FROM reactions r
        LEFT JOIN users u ON r.userId = u.id
        WHERE r.postId = ?
        GROUP BY r.type
      `, { replacements: [post.id] });

      post.reactions = reactions || [];
    }

    res.json({ posts });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////
// ✅ CREATE POST
//////////////////////////////////////////////////
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const authorId = req.user.id; // 🔥 use authorId

    if (!content) {
      return res.status(400).json({ message: "Content required" });
    }

    await sequelize.query(
      `INSERT INTO posts (content, authorId, createdAt, updatedAt)
       VALUES (?, ?, NOW(), NOW())`,
      {
        replacements: [content, authorId],
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.log("CREATE POST ERROR:", err);
    res.status(500).json({ message: "Post failed" });
  }
};


//////////////////////////////////////////////////
// ❤️ REACT POST
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// ❤️ REACT POST (FIXED)
//////////////////////////////////////////////////
// controllers/community.controller.js

exports.reactPost = async (req, res) => {
  try {
    const { postId } = req.params; // 🔥 FIX (id → postId)
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Reaction type required" });
    }

    console.log("React:", postId, type, req.user.id);

    // 👉 DELETE haddii hore u jiray
    const [existing] = await sequelize.query(`
      SELECT * FROM reactions 
      WHERE postId=? AND userId=?
    `, {
      replacements: [postId, req.user.id],
    });

    if (existing.length > 0) {
      await sequelize.query(`
        DELETE FROM reactions 
        WHERE postId=? AND userId=?
      `, {
        replacements: [postId, req.user.id],
      });
    } else {
      await sequelize.query(`
        INSERT INTO reactions (postId, userId, type)
        VALUES (?, ?, ?)
      `, {
        replacements: [postId, req.user.id, type],
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("REACTION ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


//////////////////////////////////////////////////
// 💬 ADD COMMENT
//////////////////////////////////////////////////
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;

    await sequelize.query(`
      INSERT INTO comments (postId, authorId, content, createdAt)
      VALUES (?, ?, ?, NOW())
    `, {
      replacements: [postId, req.user.id, req.body.content]
    });

    const [[post]] = await sequelize.query(`
      SELECT authorId FROM posts WHERE id = ?
    `, { replacements: [postId] });

    if (post.authorId !== req.user.id) {
      await sequelize.query(`
        INSERT INTO notifications (userId, message, createdAt)
        VALUES (?, ?, NOW())
      `, {
        replacements: [
          post.authorId,
          "Someone commented 💬"
        ]
      });

     socket.getIO().emit("newComment", {
  postId,
  content: req.body.content
});
    }

    res.json({ message: "Comment added" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////
// 💬 ADD REPLY
//////////////////////////////////////////////////
exports.addReply = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    await sequelize.query(`
      INSERT INTO comments (postId, authorId, content, parentCommentId, createdAt)
      VALUES (?, ?, ?, ?, NOW())
    `, {
      replacements: [
        postId,
        req.user.id,
        req.body.content,
        commentId
      ]
    });

    res.json({ message: "Reply added" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////
// 🗑 DELETE POST
//////////////////////////////////////////////////
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params; // ✅ sax

    if (!postId) {
      return res.status(400).json({ message: "Post ID missing" });
    }

    await sequelize.query(`
      DELETE FROM posts 
      WHERE id = ? AND authorId = ?
    `, {
      replacements: [postId, req.user.id]
    });

    res.json({ message: "Post deleted ✅" });

  } catch (err) {
    console.error("DELETE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;

    await sequelize.query(`UPDATE posts SET content=? WHERE id=? AND authorId=?`, {
      replacements: [req.body.content, postId, req.user.id],
    });

    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//////////////////////////////////////////////////
// ✏️ EDIT COMMENT
//////////////////////////////////////////////////
exports.editComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await sequelize.query(`
      UPDATE comments 
      SET content=? 
      WHERE id=? AND authorId=?
    `, {
      replacements: [req.body.content, commentId, req.user.id]
    });

    socket.getIO().emit("editComment");
    
    res.json({ message: "updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////
// 🗑 DELETE COMMENT
//////////////////////////////////////////////////
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const [[comment]] = await sequelize.query(
      `SELECT * FROM comments WHERE id=?`,
      { replacements: [commentId] }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await sequelize.query(
      `DELETE FROM comments WHERE id=?`,
      { replacements: [commentId] }
    );

    socket.getIO().emit("deleteComment");

    res.json({ message: "deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.reactComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const [existing] = await sequelize.query(`
      SELECT * FROM comment_reactions 
      WHERE commentId=? AND userId=?
    `, {
      replacements: [commentId, req.user.id],
    });
   
    if (existing.length > 0) {
      await sequelize.query(`
        DELETE FROM comment_reactions 
        WHERE commentId=? AND userId=?
      `, {
        replacements: [commentId, req.user.id],
      });
    } else {
      await sequelize.query(`
        INSERT INTO comment_reactions (commentId, userId)
        VALUES (?, ?)
      `, {
        replacements: [commentId, req.user.id],
      });
    }
     socket.getIO().emit("commentReaction");
    res.json({ message: "Reacted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////
// 🔔 GET NOTIFICATIONS
//////////////////////////////////////////////////
exports.getNotifications = async (req, res) => {
  const [data] = await sequelize.query(`
    SELECT * FROM notifications
    WHERE userId = ?
    ORDER BY createdAt DESC
  `, {
    replacements: [req.user.id]
  });

  res.json(data);
};

//////////////////////////////////////////////////
// 🔔 MARK AS READ
//////////////////////////////////////////////////
exports.markAsRead = async (req, res) => {
  await sequelize.query(`
    UPDATE notifications SET readStatus = true WHERE id = ?
  `, {
    replacements: [req.params.id]
  });

  res.json({ message: "Marked as read" });
};