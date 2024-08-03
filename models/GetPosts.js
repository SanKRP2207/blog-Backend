// src/routes/posts.js
const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/getpostsController'); // Import the controller

// Route to get all posts
router.get('/', getPosts);

module.exports = router;
