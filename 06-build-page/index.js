const fs = require('fs');
const path = require('path');

const styleDir = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(projectDist, 'style.css'), '', (err) => {
  if (err) throw err;
});

fs.readdir(styleDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i += 1) {
    if (files[i].isFile() && path.extname(files[i].name) === '.css') {
      let ReadStream = fs.createReadStream(
        path.join(styleDir, files[i].name),
        'utf-8',
      );
      let data = '';
      ReadStream.on('data', (chunk) => (data += chunk));
      ReadStream.on('end', () => {
        fs.appendFile(path.join(projectDist, 'style.css'), data, (err) => {
          if (err) throw err;
        });
      });
    }
  }
});
