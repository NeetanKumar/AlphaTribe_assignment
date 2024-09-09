const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const newComment = new Comment({ comment, postId: req.params.postId, userId: req.user._id });
    await newComment.save();
    res.json({ success: true, message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {// only person who wrote the comment can delete it, while being logged in
  try {
    const { postId, commentId } = req.params;

    // Find the post and the comment
    const comment = await Comment.findOne({ _id: commentId, postId: postId });

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Ensure the user deleting the comment is the owner or has the right permissions
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized action' });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { addComment, deleteComment };
