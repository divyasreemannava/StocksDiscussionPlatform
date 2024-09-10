const express = require('express');
const router = express.Router();
const { addComment, deleteComment } = require('../../controllers/commentController.js');
const authenticate = require('../../utils/jwt_verify_routes.js');

router.post('/:postId/comments', authenticate, addComment);
router.delete('/posts/:postId/comments/:commentId', authenticate, deleteComment);

module.exports = router;
