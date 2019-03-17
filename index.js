const fs = require('fs').promises;
const Path = require('path');

const { decodeString } = require('./helpers/string');

const analyzers = {
  messages: {
    countByDiscussion: require('./analyzers/messages-count-by-discussion'),
    distribution: require('./analyzers/messages-distribution'),
    countPerYear: require('./analyzers/messages-count-per-year'),
    mostUsedWords: require('./analyzers/messages-most-used-words'),
  },
  friends: {
    newPerYear: require('./analyzers/friends-new-per-year'),
  },
  comments: {
    countPerYear: require('./analyzers/comments-count-per-year'),
  },
  reactions: {
    countPerYear: require('./analyzers/reactions-count-per-year'),
  },
  locations: {
    visitsPerYear: require('./analyzers/locations-visits-per-year'),
  },
};

const analyzerTypesInfos = Object.keys(analyzers).reduce((infos, typeName) => {
  infos[typeName] = require(`./analyzer-types/${typeName}`);
  return infos;
}, {});

async function findMatchingFiles(baseDir, pattern) {
  const files = [];

  const traverse = async (dir) => {
    const list = await fs.readdir(dir, { withFileTypes: true });

    const traversePromises = [];
    list.forEach((file) => {
      const cur = Path.join(dir, file.name);
      if (file.isDirectory()) {
        traversePromises.push(traverse(cur, pattern));
      } else if (pattern.test(file.name)) {
        files.push(cur);
      }
    });

    await Promise.all(traversePromises);
  };

  await traverse(baseDir, pattern);
  return files;
}

async function readJsonFile(path) {
  return JSON.parse(await fs.readFile(path));
}

async function getFullName(jsonDir) {
  const profileInfoPath = Path.join(jsonDir, 'profile_information/profile_information.json');
  const profileInfo = await readJsonFile(profileInfoPath);
  return decodeString(profileInfo.profile.name.full_name);
}

async function analyze(jsonDir) {
  const fullName = await getFullName(jsonDir);
  const analyzes = {};
  const fileProcessing = [];

  for (const [type, typeAnalyzers] of Object.entries(analyzers)) {
    analyzes[type] = {};
    const typeInfos = analyzerTypesInfos[type];

    const analyzedDir = Path.join(jsonDir, typeInfos.fileMatcher.basePath);
    const files = await findMatchingFiles(analyzedDir, typeInfos.fileMatcher.pattern);

    Object.keys(typeAnalyzers).forEach((analyzerName) => {
      analyzes[type][analyzerName] = {};
    });

    fileProcessing.push(...files.map(async (file) => {
      const content = await readJsonFile(file);
      const formatedContent = typeInfos.format(content);

      const ctx = { path: file, fullName };
      Object.entries(typeAnalyzers).forEach(([analyzerName, analyzerFunc]) => {
        const analysisOutput = analyzes[type][analyzerName];
        analyzerFunc(ctx, formatedContent, analysisOutput);
      });
    }));
  }

  await Promise.all(fileProcessing);
  return analyzes;
}

if (process.argv.length <= 2) {
  console.error(`usage: node ${process.argv[1]} <json_dir>`);
  process.exit(1);
}

const jsonDir = process.argv[2];

(async () => {
  const analyzes = await analyze(jsonDir);
  console.log(JSON.stringify(analyzes, null, 2));
})();
