const  express = require('express') 
const authRouter = express.Router()


authRouter.get('/',(req,res)=>{

    res.status(201).send('auth endpoint route!')
})





module.exports = authRouter