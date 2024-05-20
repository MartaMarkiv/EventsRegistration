const EventModel = require("../../models/Event");

module.exports = async(req, res) => {
  try {
    const { page: skip, sort: {sortKey, sortValue} } = req.query;

    let sortQuery = {};
    sortQuery[sortKey] = Number(sortValue);
    
    const eventsList = await EventModel.findByQuery({}, sortQuery, skip*5); //10 items per page

    const total = await EventModel.findCountByQuery({});
    const totalPages = Math.ceil(total/5);

    return res.status(200).json({list: eventsList, total: totalPages});
  } catch (error) {
    console.log("Error happened while getting events list: ", error);
    return res.status(500).json({success: false, message: "Internal server error!"})
  }
}