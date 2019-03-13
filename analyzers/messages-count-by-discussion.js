const { dirname } = require('../helpers/path');
const { stringPart } = require('../helpers/string');

module.exports = (filename, data, out) => {
  const name = stringPart(dirname(filename), 0, '_');
  out[name] = data.messages.length;
};
