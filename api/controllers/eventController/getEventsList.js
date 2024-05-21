const EventModel = require("../../models/Event");
const config = require("../../config");

module.exports = async(req, res) => {
  try {
    const { page: skip, sort: {sortKey, sortValue} } = req.query;

    let sortQuery = {};
    sortQuery[sortKey] = Number(sortValue);

    const eventsList = await EventModel.findByQuery({}, sortQuery, (skip + 1) * config.countPerPage); // "countPerPage" items per page

    const total = await EventModel.findCountByQuery({});
    const totalPages = Math.ceil(total/config.countPerPage);

    return res.status(200).json({list: eventsList, total: totalPages});
  } catch (error) {
    console.log("Error happened while getting events list: ", error);
    return res.status(500).json({success: false, message: "Internal server error!"})
  }
}