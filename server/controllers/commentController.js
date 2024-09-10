const Comment = require('../schemas/comment_schema.js');
const Post = require('../schemas/post_schema.js');

// Add a Comment to a Post
exports.addComment = async (req, res) => {
  const { comment } = req.body;
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      comment,
      user: req.user.id,
      post: postId,
    });

    await newComment.save();
    res.status(201).json({ success: true, commentId: newComment._id, message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a Comment
exports.deleteComment = async (req, res) => {
  const { commentId, postId } = req.params;

  try {
    const comment = await Comment.findOne({ _id: commentId, post: postId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await Comment.deleteOne({_id:commentId})
    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
