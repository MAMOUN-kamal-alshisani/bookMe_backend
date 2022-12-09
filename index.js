const  express = require('express') 
const cors = require('cors')
const  dotenv = require('dotenv')
dotenv.config()
const  mongoose = require('mongoose') 
const  authRouter = require('./src/routes/auth.js') 
const  hotelRouter = require('./src/routes/hotels.js') 
const  UserRouter = require('./src/routes/users') 
const  RoomRouter = require('./src/routes/rooms') 
const logger = require('./src/middleware/logger')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3005
const server = express()

//// server middlewares implemented  ////
server.use(cors())
server.use(cookieParser())
server.use(express.json())
server.use('/api/auth',logger,authRouter)
server.use('/api/hotel',logger,hotelRouter)
server.use('/api/room',logger,RoomRouter)
server.use('/api/user',logger,UserRouter)
// 

try{
    mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB)
console.log('connected to Mongodb!')
}catch(err){throw new Error(err)}
mongoose.connection.on('disconnected',()=>console.log('mongodb disconnected!'))
// mongoose.connection.on('connected',()=>console.log('mongodb is connected!'))


server.get('/',(req,res)=>{
    res.status(200).send('home route!')
})
server.get('*',(req,res)=>{
    res.status(404).send('<h1>no specified route has been found!</h1>\n <h3><a href="http://localhost:3000/">Home route</a></h3>')
})
server.listen(PORT,console.log(`server Running on port ${PORT}`))