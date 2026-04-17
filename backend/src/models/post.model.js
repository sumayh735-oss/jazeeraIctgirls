const { sequelize, DataTypes } = require('../config/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataTypes.STRING(200),
    allowNull: true // ❗ social posts badanaa title ma leh
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // 🆕 MEDIA
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },

  video: {
    type: DataTypes.STRING,
    allowNull: true
  },

  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  channelId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // 👍 OLD SYSTEM (optional)
  upvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  downvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  voteScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  // 🆕 BETTER COUNTERS
  reactionsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  shareCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },

  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  // 🆕 ADMIN / DELETE
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'posts',
  timestamps: true
});

module.exports = Post;