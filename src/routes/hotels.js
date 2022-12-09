const express = require('express')
const  {fetchHotels,fetchHotelById,createHotel,updateHotel,removeHotel,fetchByCityN,fetchByCityT,getHotelRooms} =require('../controllers/hotelFn.js') 
const hotelRouter  = express.Router()
const {verifyToken,verifyUser,verifyAdmin} = require('../middleware/verifytoken')


hotelRouter.get('/fetchhotel',fetchHotels)
hotelRouter.get('/fetchhotel/:id',fetchHotelById)
hotelRouter.post('/createhotel',verifyAdmin,createHotel)
hotelRouter.put('/updatehotel/:id',verifyAdmin,updateHotel)
hotelRouter.delete('/removehotel/:id',verifyAdmin,removeHotel)


hotelRouter.get('/getByCount',fetchByCityN)
hotelRouter.get('/getByType',fetchByCityT)
hotelRouter.get('/room/:id',getHotelRooms)



module.exports = hotelRouter