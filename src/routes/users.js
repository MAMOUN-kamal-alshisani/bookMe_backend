const express = require("express");
const UserRouter = express.Router();
// const {signup,signin} = require('../controllers/authFn')
const {
    // checkAuth,
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  removeUser,
} = require("../controllers/userFn");

const {verifyToken,verifyUser,verifyAdmin} = require('../middleware/verifytoken')



// UserRouter.get('/checkuser/:id',verifyUser,(req,res,next)=>{

//   res.status(200).send('user login is successfull!, you can delete your account!')
// })

// UserRouter.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{

//   res.status(200).send('login as Admin is successfull!, you can delete all accounts!')
// })

UserRouter.get("/", (req, res) => {
  res.status(201).send("User endpoint route!");
});

// UserRouter.get("/checkauthentication", verifyToken,checkAuth);
UserRouter.get("/fetchUser", verifyAdmin,fetchUsers);
UserRouter.get("/fetchUser/:id", verifyUser,fetchUserById);
// UserRouter.post("/createUser", verifyUser,createUser);
UserRouter.put("/updateUser/:id", verifyUser,updateUser);
UserRouter.delete("/removeUser/:id", verifyUser,removeUser);

module.exports = UserRouter;
