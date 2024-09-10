const Post = require('../schemas/post_schema.js');
const Comment = require("../schemas/comment_schema.js");
// const { post } = require('../routes/post_routes/post_route.js');

// Create a Stock Post
exports.createPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;

  try {
    const post = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id,
    });
    console.log("-----------",req.user.id)
    await post.save();
    return res.status(201).json({
      status:"Success",
      message:"Post created successfully",
      postId:post._id

    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Posts with Filters
// controllers/postController.js

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10, stockSymbol, tags, sortBy } = req.query;

  try {
    let query = {};

    // Apply filters for stockSymbol and tags if present
    if (stockSymbol) {
      query.stockSymbol = stockSymbol;
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    // Get total number of posts based on the query
    const totalPosts = await Post.countDocuments(query);

    // Fetch posts with pagination and sorting
    const posts = await Post.find(query)
      .sort({ [sortBy === 'likes' ? 'likes' : 'createdAt']: -1 })  // Sort by likes or createdAt
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Map the posts to the required format
    const resultant_posts = posts.map(post => ({
      postId: post._id,
      stockSymbol: post.stockSymbol,
      title: post.title,
      description: post.description,
      likesCount: post.likes.length,
      createdAt: post.createdAt,
    }));

    // Send response with pagination metadata and posts
    res.status(200).json({
      totalPosts,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalPosts / limit),
      posts: resultant_posts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSinglePost = async(req,res)=>{
  const postId = req.params.postId;

  try{
    const posts = await Post.findById(postId)
    res.status(200).json({
      postId:posts._id,
      stockSymbol:posts.stockSymbol,
      title:posts.title,
      description:posts.description,
      likesCount:posts.likes.length,
      comments:posts.comments
    })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }

}

exports.deleteStockPost = async (req,res) => {
  const postId = req.params.postId;
  console.log(postId)

  try{
    const post = await Post.findById(postId)
    console.log(post)
    if(!post){
      return res.status(404).json({
        message:"Post not found"
      })
    }
    
    // if (post.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'User not authorized' });
    // }
    const post_comment = Comment.findById(postId)
    if(post_comment){
      await Comment.deleteMany({post:postId})
    }
    await Post.deleteOne({_id:postId})
    res.status(200).json({
      success: true, message: 'Post deleted successfully'
    })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}


exports.likePost = async (req,res) => {
  const  postId  = req.params.post;
  const userId = req.user.id; 
  
  try{
      const post = await Post.findById(postId)
  if(!post){
      return res.status(404).json({ message: 'Post not found' });
  }
  if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();
    res.status(200).json({ success: true, message: 'Post liked' });
  }
  catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: err.message });
  }  
}

exports.unlikePost = async (req,res)=>{
  const postId = req.params.postId
  const userId = req.user.id
  try{
    const post = await Post.findById(postId)
  if(!post){
      return res.status(404).json({ message: 'Post not found' });
  }

  if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post not liked' });
    }
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();
    res.status(200).json({ success: true, message: 'Post unliked' });

  }
  catch (err) {
      console.error('Error unliking post:', err);
      res.status(500).json({ message: 'Server Error' });
    }

}