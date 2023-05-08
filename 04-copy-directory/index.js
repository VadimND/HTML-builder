const fs = require('fs');
const {
    mkdir,
    copyFile
} = require('fs/promises');
const path = require('path');
const srcPath = path.join(__dirname, './files/');
const destPath = path.join(__dirname, './files-copy/');
function copyDir() {
try {
    const createDir = mkdir(destPath, {
        recursive: true
    });
    fs.readdir(destPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(destPath, file), (err) => {
                if (err) throw err;
            });
        }
    });
    fs.readdir(srcPath, (err, files) => {
        if (err)
            console.log(err);
        else {

            files.forEach(file => {
                //if (file.isFile()) {
                copyFile(srcPath + '/' + file, destPath + '/' + file);
                // }
            })
        }
    });

} catch (err) {
    console.error(err.message);
}};
copyDir();