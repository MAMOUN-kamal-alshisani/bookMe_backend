const express = require('express') 
const authRouter = express.Router()
const {signup,signin} = require('../controllers/authFn')

authRouter.get('/',(req,res)=>{

    res.status(201).send('auth endpoint route!')
})

authRouter.post('/signup',signup)
authRouter.post('/signin',signin)




module.exports = authRouter