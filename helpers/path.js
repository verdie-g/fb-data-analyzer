const Path = require('path');

module.exports = {
  dirname: (path) => Path.basename(Path.dirname(path)),
};
