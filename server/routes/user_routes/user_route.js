const express = require("express");
const router = express.Router();
const { login , register , getUserById , modifyUser} = require("../../controllers/userController.js")
const authenticate = require("../../utils/jwt_verify_routes.js")
router.post("/auth/login",login)
router.post("/auth/register",register)
router.get("/user/profile/:userId",authenticate, getUserById)
router.put("/user/profile",authenticate,modifyUser)

module.exports = router;
