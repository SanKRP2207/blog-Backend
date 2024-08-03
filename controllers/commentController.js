// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const createComment = async (req, res) => {
  const { postId, content } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment
    const comment = await Comment.create({
      content,
      postId,
      authorId: req.userId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  const { commentId, content } = req.body;

  try {
    // Check if the comment exists
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.authorId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the comment
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    // Check if the comment exists
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.authorId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the comment
    await comment.destroy();
    res.status(204).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Fetch comments for the post
    const comments = await Comment.findAll({ where: { postId } });
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createComment, updateComment, deleteComment, getComments};
