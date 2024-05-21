const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, required: true },
    source: { type: String, required: true },
    birthDate: { type: String, required: true }
  },
  { timestamps: true }
);

const ParticipantModel = mongoose.model("Participant", eventSchema);

module.exports = {
  create: (data) => new ParticipantModel(data).save(),

  findByQuery: (event, nameValue, emailValue) =>
    ParticipantModel.find({
      event,
      fullName: {
        $regex: nameValue,
        $options: "i"
      },
      email: {
        $regex: emailValue,
        $options: "i"
      }
    }).lean(),

  getStatistic: (event) =>
    ParticipantModel.aggregate([
      { $match: { event: new mongoose.Types.ObjectId(event) }},
      {
        $project:
        {
          date: {
            $dateToString: {
              format: "%d.%m",
              date: "$createdAt"
            }
          },
        }
      },
      {
        $group: {
          _id: { createdAt: "$date"},
          count: { $sum: 1 }
        }
      },
      { $addFields: { createdAt: "$_id.createdAt" }},
      { $project: { _id: false }},
      { $sort: { createdAt: 1 }}
    ]),

  findOneByQuery: (query) => ParticipantModel.findOne(query).lean(),
};
