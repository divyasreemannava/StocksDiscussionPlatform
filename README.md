# Stocks Discussion Platform
with building the backend of a stock discussion platform where users can discuss various stocks in the market. The backend is built using the MERN stack (MongoDB, Express.js, Node.js).<br/>

**Overview:**
-------------
The backend of a stock discussion  platform is built using the MERN stack, where users can:

1.Register, login, and manage their profile.<br/>
2.Create and manage stock posts.<br/>
3.Comment on and like posts.<br/>
4.View filtered/sorted posts and interact with them.<br/>

**This backend is secured with JWT-based authentication.**

**Tech Stack** <br/>
-------------------
1. Node.js: Backend runtime environment.<br/>
2. Express.js: Web framework for Node.js.<br/>
3. MongoDB: NoSQL database for data storage.<br/>
4. JWT (JSON Web Tokens): For user authentication.<br/>

**Features**
-----------------
1. User Authentication (JWT-based):<br/>
    - Register, login, update profile.<br/>
  
2. Stock Post Management:<br/>
    - Create, read, delete posts related to stocks.<br/>
    - Filter posts by stock symbol, tags, or sort by creation date or number of likes.<br/>
  
3. Commenting System:<br/>
    - Add and delete comments on stock posts.<br/>
  
4. Like System:<br/>
    - Like and unlike posts.<br/>

5. Filtering and Sorting:<br/>
    - API to filter posts by stock symbol or tags along with pagination.<br/>
    - Sort posts by creation date or likes.c

**Project Structure**

project-root <br/>
│<br/>
├── schemas/              # Mongoose schemas<br/>
│   ├── comment_schema.js <br/>
│   ├── user_schema.js <br/>
│   ├── post_schema.js<br/>
│<br/>
├── controllers/         # Logic for handling requests<br/>
│   ├── likeController.js<br/>
│   ├── postController.js<br/>
│   ├── commentController.js<br/>
│   ├── userController.js<br/>
  <br/>
│<br/>
├── routes/              # API route definitions<br/>
│   ├── comment_routes  ├── comment_route.js<br/>
│   ├── post_routes     ├──  post_route.js<br/>
│   ├── user_routes     ├──  user_route.js<br/>
│<br/>
├── utils/         # Authentication and other middlewares<br/>
│   ├── jwt_verify_routes.js<br/>
│<br/>
├── index.js            # Entry point for the app<br/>
│<br/>
└── README.md            # Project documentation<br/>

**API Documentation**<br/>
-------------------------
1. User Authentication:<br/>
   - POST /api/auth/register: Register a new user.<br/>
   - POST /api/auth/login: Login a user and return a token. <br/>
   - GET /api/user/profile/:userId: Get user profile details.<br/>
   - PUT /api/user/profile: Update user profile.<br/>
     
2. Stock Post Management:<br/>
    - POST /api/posts: Create a stock post (Auth required).<br/>
    - GET /api/posts: Get all posts with filters and sorting.<br/>
    - GET /api/posts/:postId: Get a single post with comments.<br/>
    - DELETE /api/posts/:postId: Delete a post (Auth required).<br/>
      
3. Commenting System:<br/>
    - POST /api/posts/:postId/comments: Add a comment to a post (Auth required).<br/>
    - DELETE /api/posts/:postId/comments/:commentId: Delete a comment (Auth required).<br/>
      
4. Like System:<br/>
    - POST /api/posts/:postId/like: Like a post (Auth required).<br/>
    - DELETE /api/posts/:postId/like: Unlike a post (Auth required).<br/>
  
5. Bonus (Optional):<br/>
    - GET /api/posts: Pagination with page and limit query parameters.<br/>
    - Socket.io: Real-time updates for new comments and likes in postController.js for likes as well as for comments in commentController.js.
      

**Running the Project**
  - npm start



