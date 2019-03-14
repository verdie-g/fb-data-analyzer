const { dirname } = require('../helpers/path');
const { stringPart } = require('../helpers/string');

module.exports = (ctx, data, out) => {
  const name = stringPart(dirname(ctx.path), 0, '_');
  out[name] = data.messages.length;
};
