const { addOrDefault } = require('../helpers/object');

module.exports = (_, data, out) => {
  data.comments.forEach((comment) => {
    comment.data.forEach((data) => {
      const year = data.date.getFullYear();
      addOrDefault(out, year, 1, 0);
    });
  });
};
