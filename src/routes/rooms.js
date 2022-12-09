
    const express = require('express')
    const RoomRouter  = express.Router()
const {verifyToken,verifyUser,verifyAdmin} = require('../middleware/verifytoken')
    

    const {fetchRooms,
        fetchRoomById,
        createRoom,
        updateRoom,
        removeRoom,
        updateRoomAvailability} = require('../controllers/roomFn')

        


        RoomRouter.get('/fetchroom',fetchRooms)
        RoomRouter.get('/fetchroom/:id',fetchRoomById)
        RoomRouter.post('/createroom/:id',verifyAdmin,createRoom)
        RoomRouter.put('/updateroom/:id',verifyAdmin,updateRoom)
        RoomRouter.put('/availability/:id',updateRoomAvailability)
        RoomRouter.delete('/removeroom/:id/:hotelid',verifyAdmin,removeRoom)
        


        module.exports = RoomRouter