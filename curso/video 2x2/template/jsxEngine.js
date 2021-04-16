const fs = require("fs");

function getKeys(options) {
  const { settings, _locals, ...args } = options;
  return args;
}

function getRenderedContent(content, options) {
  const keys = getKeys(options);
  let contentString = content.toString();

  for (const key in keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      options[key]
    );
  }

  return contentString;
}

function jsxEngine(filePath, options, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    const rendered = getRenderedContent(content, options);

    return callback(null, rendered);
  });
}

module.exports = jsxEngine;
