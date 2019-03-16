const { addOrDefault } = require('../helpers/object');

module.exports = (_, data, out) => {
  data.location_history.forEach((location) => {
    const year = location.date.getFullYear();
    if (!(year in out)) {
      out[year] = {};
    }

    addOrDefault(out[year], location.name, 1, 1);
  });
};
