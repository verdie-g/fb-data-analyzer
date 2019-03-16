const { addOrDefault } = require('../helpers/object');
const { unaccent } = require('../helpers/string');

const MIN_CHAR = 3;

module.exports = (ctx, data, out) => {
  data.messages
    .filter(message => message.sender_name === ctx.fullName)
    .forEach((message) => {
      message.content.split(/[\s.()[\]"'`\-,;:/!?]+/)
        .filter(word => word.length >= MIN_CHAR)
        .forEach((word) => {
          const formattedWord = unaccent(word.toLowerCase());
          addOrDefault(out, formattedWord, 1, 1);
        });
    });
};
