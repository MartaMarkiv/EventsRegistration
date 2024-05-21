import api from "./api";

const fetchParticipants = (eventId, nameValue = "", emailValue = "") => {
  console.log("fetchParticipants: ", eventId);
  return api.get("participant", { params: { eventId, nameValue, emailValue } })
    .then(resp => resp["data"].list)
    .catch(err => { throw new Response(err);});
};

export { fetchParticipants };