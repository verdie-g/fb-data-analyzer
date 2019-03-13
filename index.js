const fs = require('fs').promises;
const Path = require('path');
const utf8 = require('utf8');

function addOrDefault(obj, key, add, def) {
  if (key in obj) {
    obj[key] += add;
  } else {
    obj[key] = def;
  }
}

function decodeString(str) {
  return utf8.decode(str);
}

function stringPart(str, n, sep) {
  const parts = str.split(sep);
  return parts[n < 0 ? parts.length + n : n];
}

function pathPart(path, n) {
  return stringPart(path, n, Path.sep);
}

function countByDiscussion(filename, data, out) {
  const name = stringPart(pathPart(filename, -2), 0, '_');
  out[name] = data.messages.length;
}

function messageDistribution(filename, data, out) {
  const name = stringPart(pathPart(filename, -2), 0, '_');
  out[name] = {};

  const countByParticipant = {};
  data.messages.forEach((message) => {
    addOrDefault(countByParticipant, message.sender_name, 1, 0);
  });

  const total = Object.values(countByParticipant).reduce((acc, count) => acc += count, 0);
  Object.entries(countByParticipant).forEach(([participant, count]) => {
    out[name][participant] = count * 100 / total;
  });
}

const analyzers = {
  messages: [
    {
      name: 'countByDiscussion',
      func: countByDiscussion,
    },
    {
      name: 'messageDistribution',
      func: messageDistribution,
    },
  ],
};

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

const typesInfos = {
  messages: {
    fileMatcher: { basePath: 'messages', pattern: /^message.json$/ },
    format: messagesDataFormat,
  },
};

async function findMatchingFiles(baseDir, pattern) {
  const files = [];

  const traverse = async (dir) => {
    const list = await fs.readdir(dir, { withFileTypes: true });

    for (const f of list) {
      const cur = Path.join(dir, f.name);
      if (await f.isDirectory()) {
        await traverse(cur, pattern);
      } else if (pattern.test(f.name)) {
        files.push(cur);
      }
    }
  };

  await traverse(baseDir, pattern);
  return files;
}

if (process.argv.length <= 2) {
  console.error(`usage: node ${process.argv[1]} <json_dir>`);
  process.exit(1);
}

const jsonDir = process.argv[2];

(async () => {
  const analyzes = {};

  const fileProcessing = [];

  for (const [type, typeAnalyzers] of Object.entries(analyzers)) {
    analyzes[type] = {};
    const typeInfos = typesInfos[type];

    const analyzedDir = Path.join(jsonDir, typeInfos.fileMatcher.basePath);
    const files = await findMatchingFiles(analyzedDir, typeInfos.fileMatcher.pattern);

    typeAnalyzers.forEach((analyzer) => {
      analyzes[type][analyzer.name] = {};
    });

    fileProcessing.push(...files.map(async (file) => {
      const content = JSON.parse(await fs.readFile(file));
      const formatedContent = typeInfos.format(content);

      typeAnalyzers.forEach((analyzer) => {
        const analysisOutput = analyzes[type][analyzer.name];
        analyzer.func(file, formatedContent, analysisOutput);
      });
    }));
  }

  await Promise.all(fileProcessing);
  console.log(JSON.stringify(analyzes, null, 2));
})();
