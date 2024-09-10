const express = require('express');
const router = express.Router();
const { createPost, getPosts , getSinglePost , deleteStockPost , likePost , unlikePost } = require('../../controllers/postController.js');
const authenticate = require('../../utils/jwt_verify_routes.js');

router.get('/posts/:postId',getSinglePost)
router.post('/posts', authenticate, createPost);
router.get('/posts', getPosts);
router.delete('/posts/:postId',deleteStockPost)
router.post('/posts/:postId/like',authenticate,likePost)
router.delete('/posts/:postId/like',authenticate,unlikePost)
module.exports = router;