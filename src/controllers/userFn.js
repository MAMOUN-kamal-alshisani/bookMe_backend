const userModel = require('../models/users')


function checkAuth(req,res,next){

        // if(err){res.status(404).send(err)}
        res.status(200).send(`have successfully logged in! `)
    // })
    
    next()

}

async function fetchUsers(req, res) {
    userModel.find({}, (err, data) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(data);
      console.log(data);
    });
  

  }
  //// fetch a specified data from the database
  async function fetchUserById(req, res) {
    let id = req.params.id;
    try {
      let findUser = await userModel.findById(id);
      res.status(200).send(findUser);
      console.log(findUser);
    } catch (err) {
      res.status(404).send(err);
    }
  }
  
  //// call a specified data by id and updating it
  async function updateUser(req, res) {
    const id = req.params.id;
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).send(updateUser);
    } catch (err) {
      res.status(404).send(err);
    }
  }
  //// call a specified data by id and deleting it
  
  async function removeUser(req, res) {
    const id = req.params.id;
    try {
      await userModel.findByIdAndDelete(id);
      res.status(200).send("specified user has been deleted!");
    } catch (err) {
      res.status(500).send(err);
    
    }
  }
  // commonjs export method
  module.exports = {
    checkAuth,
    fetchUsers,
    fetchUserById,
    // createUser,
    updateUser,
    removeUser,
  };
  