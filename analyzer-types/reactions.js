const { decodeString } = require('../helpers/string');

function reactionsDataFormat(reactionsData) {
  reactionsData.reactions = reactionsData.reactions.map(reaction => (
    {
      date: new Date(reaction.timestamp * 1000),
      title: decodeString(reaction.title),
      data: reaction.data.map(data => (
        {
          reaction: decodeString(data.reaction),
          actor: decodeString(data.reaction.actor),
        }
     )),
    }
  ));

  return reactionsData;
}

module.exports = {
  fileMatcher: { basePath: 'likes_and_reactions', pattern: /^posts_and_comments.json$/ },
  format: reactionsDataFormat,
};
