const cron = require("node-cron");
const eventListSync = require("./eventListSyncronization");

module.exports = async() => {
  await eventListSync();

  cron.schedule("0 0 */1 * * *", () => {
    eventListSync();
  });
}