const { decodeString } = require('../helpers/string');

function messagesDataFormat(messagesData) {
  messagesData.participants = messagesData.participants.map(participant => (
    { name: decodeString(participant.name) }
  ));

  messagesData.messages = messagesData.messages.map(message => (
    {
      sender_name: decodeString(message.sender_name),
      date: new Date(message.timestamp_ms),
      content: message.content,
      type: message.type,
    }
  ));

  return messagesData;
}

module.exports = {
  fileMatcher: { basePath: 'messages', pattern: /^message.json$/ },
  format: messagesDataFormat,
};
