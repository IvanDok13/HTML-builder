const fs = require('fs');

let readStream = fs.createReadStream('./01-read-file/text.txt');
readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
