const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
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

  findOneByQuery: (query) => ParticipantModel.findOne(query).lean(),
};
