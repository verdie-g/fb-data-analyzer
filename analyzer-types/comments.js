const { decodeString } = require('../helpers/string');

function commentsDataFormat(commentsData) {
  commentsData.comments = commentsData.comments.map(comment => (
    {
      date: new Date(comment.timestamp * 1000),
      title: decodeString(comment.title),
      data: comment.data.map(data => (
        {
          date: new Date(data.comment.timestamp * 1000),
          // comment: decodeString(data.comment), FIXME
          author: decodeString(data.comment.author),
        }
     )),
    }
  ));

  return commentsData;
}

module.exports = {
  fileMatcher: { basePath: 'comments', pattern: /^comments.json$/ },
  format: commentsDataFormat,
};
