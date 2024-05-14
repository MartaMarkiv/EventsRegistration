const express = require('express');
const router = express.Router();
const EventModel = require("../models/Event");

router.get('/', async (req, res) => {
  const eventsList = await EventModel.findByQuery({});
  return res.status(200).json({list: eventsList});
});

router.post('/', async(req, res) => {
  const { description, title, organizer, eventDate } = req.body;
  
  if(!description || !title || !organizer || !eventDate) {
    return res.status(400).json({message: "Bad request"});
  }

  await EventModel.create({
    description,
    title,
    organizer,
    eventDate
  });

  return res.status(200).json({message: "POST method in user routes"});
});

module.exports = router;
