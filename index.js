const fs = require('fs').promises;
const Path = require('path');

const analyzers = {
  messages: {
    countByDiscussion: require('./analyzers/messages-count-by-discussion'),
    distribution: require('./analyzers/messages-distribution'),
    countPerYear: require('./analyzers/messages-count-per-year'),
  },
  friends: {
    newPerYear: require('./analyzers/friends-new-per-year'),
  },
  comments: {
    countPerYear: require('./analyzers/comments-count-per-year'),
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
    const typeInfos = analyzerTypesInfos[type];

    const analyzedDir = Path.join(jsonDir, typeInfos.fileMatcher.basePath);
    const files = await findMatchingFiles(analyzedDir, typeInfos.fileMatcher.pattern);

    Object.keys(typeAnalyzers).forEach((analyzerName) => {
      analyzes[type][analyzerName] = {};
    });

    fileProcessing.push(...files.map(async (file) => {
      const content = JSON.parse(await fs.readFile(file));
      const formatedContent = typeInfos.format(content);

      const ctx = { path: file, myName: '' };
      Object.entries(typeAnalyzers).forEach(([analyzerName, analyzerFunc]) => {
        const analysisOutput = analyzes[type][analyzerName];
        analyzerFunc(ctx, formatedContent, analysisOutput);
      });
    }));
  }

  await Promise.all(fileProcessing);
  console.log(JSON.stringify(analyzes, null, 2));
})();
