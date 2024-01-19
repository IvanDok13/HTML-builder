const fs = require('fs');
const path = require('path');

const origFilesPath = path.join(__dirname, 'files');
const copyFilesPath = path.join(__dirname, 'files-copy');

const copyDir = () => {
  fs.readdir(copyFilesPath, { withFileTypes: true }, (err, files) => {
    if (files) {
      files.forEach((file) => {
        fs.unlink(path.join(copyFilesPath, file.name), (err) => {
          if (err) throw err;
        });
      });
    }
  });

  fs.mkdir(copyFilesPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(origFilesPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(origFilesPath, file.name),
        path.join(copyFilesPath, file.name),
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
};

copyDir();
