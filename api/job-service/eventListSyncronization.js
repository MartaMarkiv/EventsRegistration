const fetchEventList = require("./fetchEvents");
const EventModel = require("../models/Event");

module.exports = async() => {
  try {
    const eventsList = await fetchEventList();
    const list = eventsList?.events.map(item => {
      const { summary: title, description, dtstart: eventDate, location: organizer } = item;
      return {
        title,
        description,
        eventDate,
        organizer
      }
    });
    
    await EventModel.insertList(list);
    
  } catch (error) {
    console.log("Error happened in job-service: ", error);
  }
  
}