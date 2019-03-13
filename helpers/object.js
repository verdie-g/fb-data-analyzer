module.exports = {
  addOrDefault: (obj, key, add, def) => {
    if (key in obj) {
      obj[key] += add;
    } else {
      obj[key] = def;
    }
  },
};
