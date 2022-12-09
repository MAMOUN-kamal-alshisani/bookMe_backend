const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signup = async (req,res) =>{
    const {username,password,email} = req.body
try{
const hashedPassword = bcrypt.hashSync(password,10)
    const User = new userModel({
        ...req.body,
        password:hashedPassword,
   
    })
    await User.save()
    res.status(200).send(User)
}catch(err){
    throw new Error(err)
}
// next()
}

const signin = async (req,res) =>{
    const {username,email} = req.body
try{
    const User = await userModel.findOne({username})
    if(!User)return res.status(404).send('username is not found!')

const validPassword = await bcrypt.compare(req.body.password,User.password)
if(!validPassword) return res.status(404).send('password is incorrect!')

const {password,isAdmin, ...otherDetails} = User._doc

const token = jwt.sign({id:User._id , isAdmin:User.isAdmin},process.env.JWT || 'secret')
    res.cookie('token', token,{
        httpOnly:true
    }).status(200).send({details:{...otherDetails,isAdmin}})

}catch(err){
    console.log(err);
}
// next()
}
module.exports = {signup,signin}