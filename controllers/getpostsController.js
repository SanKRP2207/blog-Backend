// src/controllers/postController.js
const pool = require('../config/database'); // Import your database configuration

// Controller to get all posts
const getPosts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts'); // Adjust your query as needed
        res.json(rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};

module.exports = {
    getPosts
};
