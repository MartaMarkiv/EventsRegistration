const ParticipantModel = require("../../models/Participant");

module.exports = async(req, res) => {
  try {
    const { eventId: event, nameValue = "", emailValue = "" } = req.query;

    if (!event) {
      return res.status(400).json({success: false, message: "Bad request."});
    }

    const list = await ParticipantModel.findByQuery(event, nameValue, emailValue);
    return res.status(200).json({ list });

  } catch (error) {
    console.log("Error happened while getting Participants list: ", error);
    return res.status(500).json({
      success: false,
      message: "Error happened. Please, try again later."
    });
  }
}