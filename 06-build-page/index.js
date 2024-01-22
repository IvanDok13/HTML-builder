const fs = require('fs');
const path = require('path');

const assetsDist = path.join(__dirname, 'assets');
const styleDir = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');
const projectDistAsset = path.join(projectDist, 'assets');
const compDir = path.join(__dirname, 'components');

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

const copyDir = (orig = assetsDist, target = projectDistAsset) => {
  fs.mkdir(target, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(orig, { withFileTypes: true }, (err, folder) => {
    if (err) throw err;
    folder.forEach((elem) => {
      const filePath = path.join(orig, elem.name);
      const newFilePath = path.join(target, elem.name);
      if (elem.isFile()) {
        fs.copyFile(filePath, newFilePath, (err) => {
          if (err) throw err;
        });
      } else if (elem.isDirectory()) {
        fs.mkdir(newFilePath, { recursive: true }, (err) => {
          if (err) throw err;
        });
        copyDir(filePath, newFilePath);
      }
    });
  });
};
copyDir();

let page = '';

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, part) => {
  if (err) throw err;
  page += part;

  fs.readdir(compDir, { withFileTypes: true }, (err, elem) => {
    if (err) throw err;
    for (let i = 0; i < elem.length; i += 1) {
      fs.readFile(path.join(compDir, elem[i].name), 'utf-8', (err, part) => {
        if (err) throw err;
        let tempTag = `{{${path.basename(elem[i].name, '.html')}}}`;
        page = page.replace(tempTag, part);

        fs.writeFile(path.join(projectDist, 'index.html'), page, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});
