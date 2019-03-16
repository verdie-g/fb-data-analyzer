const { addOrDefault } = require('../helpers/object');
const { isEmoji } = require('../helpers/string');

const MIN_CHAR = 3;

module.exports = (ctx, data, out) => {
  data.messages
    .filter(message => message.sender_name === ctx.fullName)
    .forEach((message) => {
      message.content.split(/[\s.()[\]"'`\-,;:/!?]+/)
        .filter(word => word.length >= MIN_CHAR && isEmoji(word))
        .forEach((word) => { addOrDefault(out, word, 1, 1); });
    });
};
