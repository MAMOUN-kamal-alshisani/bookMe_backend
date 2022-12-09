const roomModel = require('../models/rooms')
const hotelModel = require('../models/hotels')

async function fetchRooms(req, res) {
    roomModel.find({}, (err, data) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(data);
      console.log(data);
    });
  }
  //// fetch a specified data from the database
  async function fetchRoomById(req, res) {
    let id = req.params.id;
    try {
      let findRoom = await roomModel.findById(id);
      res.status(200).send(findRoom);
      console.log(findRoom);
    } catch (err) {
      res.status(404).send(err);
    }
  }



async function createRoom(req,res){

    const id = req.params.id
const newRoom = new roomModel(req.body)

try{

        const savedRoom =await newRoom.save()
        try{
            await hotelModel.findByIdAndUpdate(id,{
                $push:{rooms:[savedRoom._id]}
                })
        }catch(err){res.status(404).send(err)}
   
               res.status(200).send(savedRoom)
    
    // res.status(404).send('no rooms available to update!')


}catch(err){res.status(500).send(err)}
}


async function updateRoom(req, res) {
    const id = req.params.id;
    try {
      const updateRoom = await roomModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).send(updateRoom);
    } catch (err) {
      res.status(404).send(err);
    }
  }



  //// call a specified data by id and deleting it
  
  async function removeRoom(req, res) {
    const id = req.params.id;
    const hotelid = req.params.hotelid
    try {
      await roomModel.findByIdAndDelete(id);
      try{
        await hotelModel.findByIdAndUpdate(hotelid,{
            $pull:{rooms:req.params._id}
            })
    }catch(err){res.status(404).send(err)}

      res.status(200).send("specified data table has been deleted!");
    } catch (err) {
      res.status(500).send(err);
    
    }
  }

  async function updateRoomAvailability(req, res) {
    const id = req.params.id;
    try {
        await roomModel.updateOne(
        {'roomNumber._id':id},
        {
        $push:{
          "roomNumber.$.unavailableDates":req.body.date
        }
      })

      res.status(200).send('room has been updated!');
    } catch (err) {
      res.status(404).send(err);
    }
  }


  module.exports = {fetchRooms,
    fetchRoomById,
    createRoom,
    updateRoom,
    removeRoom,
    updateRoomAvailability}