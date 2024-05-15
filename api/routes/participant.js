const express = require('express');
const router = express.Router();
const ParticipantModel = require("../models/Participant");

router.get('/', async (req, res) => {
  const eventsList = await ParticipantModel.findByQuery({});
  return res.status(200).json({list: eventsList});
});

router.post('/', async(req, res) => {
  const { eventId: event, fullName, email, source, birthDate } = req.body;
  
  if(!event || !fullName || !email || !source || !birthDate) {
    return res.status(400).json({message: "Bad request"});
  }

  await ParticipantModel.create({
    event,
    fullName,
    email,
    source,
    birthDate
  });

  return res.status(200).json({message: "You are successfully registered."});
});

module.exports = router;
