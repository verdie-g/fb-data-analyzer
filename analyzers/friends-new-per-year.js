const { addOrDefault } = require('../helpers/object');

module.exports = (_, data, out) => {
  data.friends.forEach((friend) => {
    const year = friend.date.getFullYear();
    addOrDefault(out, year, 1, 0);
  });
};
