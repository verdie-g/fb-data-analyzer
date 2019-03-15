const { addOrDefault } = require('../helpers/object');
const { unaccent } = require('../helpers/string');

const MIN_CHAR = 3;

module.exports = (ctx, data, out) => {
  const wordsUsed = data.messages
    .filter(message => message.sender_name === ctx.fullName)
    .reduce((wordsUsed, message) => {
      message.content
        .split(/[\s.()[\]"'`\-,;:/!?]+/)
        .filter(word => word.length >= MIN_CHAR)
        .forEach((word) => {
          const formattedWord = unaccent(word.toLowerCase());
          addOrDefault(wordsUsed, formattedWord, 1, 1);
        });
      return wordsUsed;
    }, {});

  Object.entries(wordsUsed)
    .map(([word, count]) => ({ word, count }))
    .sort(obj => obj.count)
    .forEach(obj => addOrDefault(out, obj.word, obj.count, 1));
};
