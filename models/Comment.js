// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

Comment.belongsTo(User, { foreignKey: 'authorId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
User.hasMany(Comment, { foreignKey: 'authorId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

module.exports = Comment;