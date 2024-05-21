import api from "./api";

const fetchParticipants = (eventId, nameValue = "", emailValue = "") => {
  return api.get("participant", { params: { eventId, nameValue, emailValue } })
    .then(resp => resp["data"].list)
    .catch(err => { throw new Response(err);});
};

const fetchStatistic = (eventId) => {
  return api.get("participant/statistic", { params: { eventId } })
    .then(resp => resp["data"].list)
    .catch(err => { throw new Response(err);});
};

export { fetchParticipants, fetchStatistic };