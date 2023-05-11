const fs = require('fs');
const {
    mkdir,
    copyFile
} = require('fs/promises');
const path = require('path');
const srcPath = path.join(__dirname, './files/');
const destPath = path.join(__dirname, './files-copy/');

fs.rm(destPath, {recursive: true}, (err) => {
    fs.mkdir(destPath, {recursive: true}, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Папка успешно создана');
        copyDir();
      }
    });
  }); 

function copyDir() {
    fs.readdir(srcPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                copyFile(srcPath + '/' + file, destPath + '/' + file);
            })
        }
    })
}