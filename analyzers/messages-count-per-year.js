const { addOrDefault } = require('../helpers/object');

module.exports = (_, data, out) => {
  data.messages.forEach((message) => {
    const year = message.date.getFullYear();
    addOrDefault(out, year, 1, 0);
  });
};
