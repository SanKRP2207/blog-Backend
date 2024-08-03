// controllers/likeController.js
const Like = require('../models/Like');
const Post = require('../models/Post');

const likePost = async (req, res) => {
  const { postId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({
      where: { userId: req.userId, postId },
    });
    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    // Create a new like
    const like = await Like.create({ userId: req.userId, postId });
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has liked the post
    const existingLike = await Like.findOne({
      where: { userId: req.userId, postId },
    });
    if (!existingLike) {
      return res.status(400).json({ error: 'You have not liked this post' });
    }

    // Delete the like
    await existingLike.destroy();
    res.status(204).json({ message: 'Like removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New method to get likes for a specific post
// const getLikesForPost = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     // Check if the post exists
//     const post = await Post.findByPk(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Fetch likes for the post
//     const likes = await Like.findAll({
//       where: { postId },
//       attributes: ['userId'], // Adjust this if you want to return more information
//     });

//     res.status(200).json(likes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const getLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    // Fetch the number of likes for the post
    const likeCount = await Like.count({ where: { postId } });
    
    // Check if the user has liked the post
    const hasLiked = await Like.findOne({
      where: { userId: req.userId, postId }
    });
    
    res.json({
      likes: likeCount,
      hasLiked: !!hasLiked
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { likePost, unlikePost, getLikes };
