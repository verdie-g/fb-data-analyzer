const { addOrDefault } = require('../helpers/object');

module.exports = (_, data, out) => {
  data.reactions.forEach((reaction) => {
    const year = reaction.date.getFullYear();
    reaction.data.forEach(() => { addOrDefault(out, year, 1, 1); });
  });
};
