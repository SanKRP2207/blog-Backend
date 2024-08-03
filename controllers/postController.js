// controllers/postController.js
const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      authorId: req.userId,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// New method to get a post by its ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createPost, getPostById};
