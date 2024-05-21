const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

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

  findByQuery: (query, sortQuery, skip) => EventModel.find(query)
    .sort(sortQuery)
    .skip(0)
    .limit(skip)
    .lean(),

  getSorted: (sortQuery, limitItems) => EventModel.find({})
    .skip(0)
    .limit(limitItems)
    .sort(sortQuery)
    .lean(),

  findOneByQuery: (query) => EventModel.findOne(query).lean(),

  findCountByQuery: (query) => EventModel.countDocuments(query),
};
