const fs = require('fs');
const path = require('path');
const process = require('process');

let writeStream = fs.createWriteStream(path.join(__dirname, 'new-text.txt'));
let { stdout, stdin, exit } = process;

stdout.write(
  'Hey, dude! Give me some code (type exit or press Ctrl+C if you would like finish):\n\n',
);
stdin.on('data', (input) => {
  if (input.toString().trim() === 'exit') {
    exitFunc();
  }
  writeStream.write(input);
});

process.on('SIGINT', exitFunc);
function exitFunc() {
  stdout.write('Directed by Robert B. Weide...');
  exit();
}
