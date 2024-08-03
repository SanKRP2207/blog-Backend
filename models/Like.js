// models/Like.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

const Like = sequelize.define('Like', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
User.hasMany(Like, { foreignKey: 'userId' });
Post.hasMany(Like, { foreignKey: 'postId' });

module.exports = Like;