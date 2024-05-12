const express = require('express');
const router = express.Router();
const EventModel = require("../models/Event");

router.get('/', async (req, res) => {
  const eventsList = await EventModel.findByQuery({});
  return res.status(200).json({list: eventsList});
});

router.post('/', async(req, res) => {
  const { description, title, organizer, eventDate } = req.body;
  console.log(body);

  const newEvent = await EventModel.create({
    description,
    title,
    organizer,
    eventDate
  });
  console.log(newEvent);

  return res.status(200).json({message: "POST method in user routes"});
});

module.exports = router;
