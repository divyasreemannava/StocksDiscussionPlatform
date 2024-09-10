const express = require("express")
require('dotenv').config()
const port = process.env.PORT || 8080
const app = express()
app.use(express.json())
const login_route = require("./routes/user_routes/user_route.js")
const post_route = require("./routes/post_routes/post_route.js")
const comment_route = require("./routes/comment_routes/comment_route.js")
const Connection = require("./mongo_connection/connection.js")

Connection()

app.use("/api",login_route)
app.use("/api",post_route)
app.use("/api",comment_route)

app.listen(port,()=>{
    console.log(`Server id up at ${port}`)
})