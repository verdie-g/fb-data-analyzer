const { addOrDefault } = require('../helpers/object');
const { dirname } = require('../helpers/path');
const { stringPart } = require('../helpers/string');

module.exports = (filename, data, out) => {
  const name = stringPart(dirname(filename), 0, '_');
  out[name] = {};

  const countByParticipant = {};
  data.messages.forEach((message) => {
    addOrDefault(countByParticipant, message.sender_name, 1, 0);
  });

  const total = Object.values(countByParticipant).reduce((acc, count) => acc += count, 0);
  Object.entries(countByParticipant).forEach(([participant, count]) => {
    out[name][participant] = count * 100 / total;
  });
};
