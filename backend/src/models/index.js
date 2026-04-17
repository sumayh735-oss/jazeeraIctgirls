// backend/src/models/index.js
const cloudinary = require("./config/cloudinary");

cloudinary.api.ping((error, result) => {
  console.log("CLOUDINARY TEST:", error, result);
});
const { sequelize, DataTypes } = require('../config/database');

// Load model file (could be: Model export OR factory export)
const loadModel = (mod) => {
  // If it is a factory function: (sequelize, DataTypes) => Model
  if (typeof mod === 'function' && !mod.sequelize) {
    return mod(sequelize, DataTypes);
  }
  // If it is already a Sequelize model
  return mod;
};

// Your mixed exports are handled here:
const User = loadModel(require('./user.model'));      // exports Model directly
const Post = loadModel(require('./post.model'));      // could be Model OR factory
const Comment = loadModel(require('./comment.model')); // exports factory (you showed)
const Channel = loadModel(require('./channel.model')); // exports factory (you showed)

// ============================
// Associations
// ============================

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'authorId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Channel.hasMany(Post, { foreignKey: 'channelId', as: 'posts' });
Post.belongsTo(Channel, { foreignKey: 'channelId', as: 'channel' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parentComment' });
Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies' });

User.hasMany(Channel, { foreignKey: 'createdBy', as: 'createdChannels' });
Channel.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// ✅ Export the models as an OBJECT
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Channel
};
