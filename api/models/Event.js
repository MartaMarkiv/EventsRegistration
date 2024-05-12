const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    eventDate: { type: String, required: true }
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = {
  create: (data) => new EventModel(data).save(),

  findByQuery: (query) => EventModel.find(query).lean(),

  findOneByQuery: (query) => EventModel.findOne(query).lean(),
};
