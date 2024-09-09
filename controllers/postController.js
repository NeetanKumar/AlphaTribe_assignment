const Post = require('../models/Post');
const Comment = require('../models/Comment'); //needed indeed debug
// Controller function to create a new post
const createPost = async (req, res) => {
  // console.log(req.body);
  try {
    const { stockSymbol, title, description, tags } = req.body;
    const post = new Post({
      stockSymbol,
      title,
      description,
      tags,
      userId: req.user.id,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Count the likes (assuming 'likes' is an array of user IDs)
    const likesCount = post.likes ? post.likes.length : 0;

    // Fetch comments associated with the post
    const comments = await Comment.find({ postId: postId }).select('comment userId createdAt');

    // Prepare the response
    const postResponse = {
      postId: post._id,
      stockSymbol: post.stockSymbol,
      title: post.title,
      description: post.description,
      likesCount: likesCount,
      comments: comments.map(comment => ({
        commentId: comment._id,
        userId: comment.userId,
        comment: comment.comment,
        createdAt: comment.createdAt,
      })),
    };

    res.status(200).json(postResponse);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to get all posts
const getPosts = async (req, res) => {
  const { stockSymbol, tags, sortBy } = req.query;
  let query = {};

  // Filtering by stock symbol and tags
  if (stockSymbol) query.stockSymbol = stockSymbol;
  if (tags) query.tags = { $in: tags.split(',') };

  // Pagination settings
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Find posts based on the query
    const posts = await Post.find(query)
      .sort({ [sortBy === 'likes' ? 'likes.length' : 'createdAt']: -1 })
      .skip(skip)
      .limit(limit)
      .select('_id stockSymbol title description likes createdAt'); // Select only the necessary fields

    const total = await Post.countDocuments(query);

    // Format the response
    const formattedPosts = posts.map(post => ({
      postId: post._id,
      stockSymbol: post.stockSymbol,
      title: post.title,
      description: post.description,
      likesCount: post.likes ? post.likes.length : 0, // Count likes
      createdAt: post.createdAt,
    }));

    // Return paginated response
    res.json({
      totalPosts: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      posts: formattedPosts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


  


// Controller function to delete a post by ID
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const likePost = async(req, res) =>{// only authorization token sent in headers
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // User ID from the authenticated JWT

    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Post already liked' });
    }

    // Add the user's ID to the likes array
    post.likes.push(userId);
    await post.save(); // Save the updated post

    // Send success response
    res.json({
      success: true,
      message: 'Post liked',
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}
 
const unlikePost = async(req, res)=>{// only post liked by logged in person can be unliked
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // User ID from the authenticated JWT

    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user has not liked the post yet
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Post not liked yet' });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId.toString());
    await post.save(); // Save the updated post

    // Send success response
    res.json({
      success: true,
      message: 'Post unliked',
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  } 
}

// Export all three functions
module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost, 
  unlikePost
};
