import api from "./api";

const fetchParticipants = (eventId) => {
  console.log("fetchParticipants: ", eventId);
  return api.get("participant", { params: { eventId } })
    .then(resp => resp["data"].list)
    // eslint-disable-next-line no-unused-vars
    .catch(err => new Request());
};

export { fetchParticipants };