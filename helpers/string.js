const utf8 = require('utf8');

module.exports = {
  decodeString: str => utf8.decode(str),

  stringPart: (str, n, sep) => {
    const parts = str.split(sep);
    return parts[n < 0 ? parts.length + n : n];
  },

  unaccent: str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
};
