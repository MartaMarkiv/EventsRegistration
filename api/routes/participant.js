const express = require('express');
const router = express.Router();
const ParticipantModel = require("../models/Participant");
const getParticipantsList = require("../controllers/participantController/getParticipantsList");
const getParticipantsStatistic = require("../controllers/participantController/getParticipantsStatistic");

router.get('/', getParticipantsList);
router.get('/statistic', getParticipantsStatistic);

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
