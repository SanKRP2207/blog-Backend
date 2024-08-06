
require('dotenv').config();
const express = require('express');
const sequelize = require('../config/database');
// const bodyParser = require('body-parser');
const { register, login } = require('../controllers/userController');
const { createPost, getPostById, getPosts } = require('../controllers/postController');
const { likePost, unlikePost, getLikes } = require('../controllers/likeController');
const { createComment, updateComment, deleteComment, getComments } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const postRoutes = require('../models/GetPosts'); // Import your route
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.get('/test', auth, (req, res) => {
  res.json({ message: 'Authenticated successfully', userId: req.userId });
});

app.get('/posts/:postId/likes', getLikes);
app.get('/posts/:id', getPostById);
app.get('/posts/:postId/comments', getComments);
app.get('/', getPosts); // Use the posts route
app.post('/register', register);
app.post('/login', login);
app.post('/posts', auth, createPost);
app.post('/likes', auth, likePost);
app.delete('/likes', auth, unlikePost);
app.post('/posts/comments', auth, createComment);
app.put('/comments', auth, updateComment);
app.delete('/comments', auth, deleteComment);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
