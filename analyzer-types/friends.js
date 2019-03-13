const { decodeString } = require('../helpers/string');

function friendsDataFormat(friendsData) {
  friendsData.friends = friendsData.friends.map(friend => (
    {
      name: decodeString(friend.name),
      date: new Date(friend.timestamp * 1000),
    }
  ));

  return friendsData;
}

module.exports = {
  fileMatcher: { basePath: 'friends', pattern: /^friends.json$/ },
  format: friendsDataFormat,
};
