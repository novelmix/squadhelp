const fs = require('fs');

module.exports.createPublicFolder = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true,
    });
  }
}