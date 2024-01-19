const fs = require('fs');
const path = require('path');

let folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(folderPath, file.name), (err, fileInfo) => {
        if (err) throw err;
        let nameOfFile = path.basename(file.name, path.extname(file.name));
        let extOfFile = path.extname(file.name).slice(1);
        let sizeOfFile = (fileInfo.size / 1024).toFixed(3);

        console.log(`${nameOfFile}-${extOfFile}-${sizeOfFile}kb`);
      });
    }
  });
});
