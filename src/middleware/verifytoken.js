const jwt = require('jsonwebtoken')


function verifyToken(req,res,next){

    const token = req.cookies.token

    if(!token){
        res.status(404).send('you are not authenticated!')
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{

        if(err){
        res.status(403).send(err);
        }
        req.user = user
    })

    next()
}

function verifyUser(req,res,next){
const id = req.params.id
    verifyToken(req,res,next,()=>{
        if(req.user.id == id || req.user.isAdmin){
            next()
        }else{
           res.status(403).send('you are not authorized!')
        }
    })
}
function verifyAdmin(req,res,next){
   
        verifyToken(req,res,next,()=>{
            if(req.user.isAdmin){
                next()
            }else{
              res.status(403).send('you are not authorized!')
            }
        })
    }

module.exports = {verifyToken,verifyUser,verifyAdmin}