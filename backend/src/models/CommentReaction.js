// models/commentReaction.js
module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define("CommentReaction", {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "like",
    },
  });

  return CommentReaction;
};