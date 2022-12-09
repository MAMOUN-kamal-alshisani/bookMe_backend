const hotelModel = require("../models/hotels.js");
const roomModel = require('../models/rooms')
//// fetch all data from the database
// async function fetchHotels(req, res) {
//   hotelModel.find({}, (err, data) => {
//     if (err) {
//       res.status(404).send(err);
//     }
//     res.status(200).send(data);
//     console.log(data);
//   });


// }

async function fetchHotels(req, res) {
  // const featured =req.query.featured
  const {min,max,...others} = req.query
  hotelModel.find({...others,min_price:{$gt:min ||100,$lt:max || 1000000}}, (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(data);
    console.log(data);
  }).limit(req.query.limit)


}


//// fetch a specified data from the database
async function fetchHotelById(req, res) {
  let id = req.params.id;
  try {
    let findHotel = await hotelModel.findById(id);
    res.status(200).send(findHotel);
    console.log(findHotel);
  } catch (err) {
    res.status(404).send(err);
  }
}
//// create json data and send it to the database
async function createHotel(req, res) {
  let {
    name,
    city,
    type,
    address,
    picture,
    placePicture,
    desc,
    rating,
    rooms,
    min_price,
  } = req.body;

  let newHotel = new hotelModel({
    name: name,
    city: city,
    type: type,
    address: address,
    picture: picture,
    placePicture:placePicture,
    desc: desc,
    rating: rating,
    rooms: rooms,
    min_price: min_price,
  });
  try {
    let savedHotel = await newHotel.save();
    res.status(201).send(savedHotel);
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
}
//// call a specified data by id and updating it
async function updateHotel(req, res) {
  const id = req.params.id;
  try {
    const updateHotel = await hotelModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(updateHotel);
  } catch (err) {
    res.status(404).send(err);
  }
}
//// call a specified data by id and deleting it

async function removeHotel(req, res) {
  const id = req.params.id;
  try {
    await hotelModel.findByIdAndDelete(id);
    res.status(200).send("specified data table has been deleted!");
  } catch (err) {
    res.status(500).send(err);
  
  }
}


async function fetchByCityN(req, res) {
  const cities = req.query.cities.split(',')

  try{
const list = await Promise.all(cities.map(city=>{
  return hotelModel.countDocuments({city:city})
}))
res.status(200).send({list,
  cities});
}catch(err){console.log(err)}
}

async function fetchByCityT(req, res) {

  try{
const HotelCount = await hotelModel.countDocuments({type:'hotel'})
const ApartmentCount = await hotelModel.countDocuments({type:'apartment'})
const MansionCount = await hotelModel.countDocuments({type:'mansion'})
const HouseCount = await hotelModel.countDocuments({type:'house'})


res.status(200).send([
  {type:"hotel",count:HotelCount},
  {type:"apartment",count:ApartmentCount},
  {type:"mansion",count:MansionCount},
  {type:"house",count:HouseCount},
])
}catch(err){console.log(err)}
}

async function getHotelRooms(req,res){

  try{
const Hotel =await hotelModel.findById(req.params.id)
const Room =await Promise.all(Hotel.rooms.map(room=>{
  return roomModel.findById(room)
}))
res.status(200).send(Room)
  }catch(err){
res.status(404).send(err)
  }
}
// commonjs export method
module.exports = {
  fetchHotels,
  fetchHotelById,
  createHotel,
  updateHotel,
  removeHotel,
  fetchByCityN,
  fetchByCityT,
  getHotelRooms
};
