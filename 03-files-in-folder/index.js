const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './secret-folder/');

fs.readdir(filePath, {
    withFileTypes: true
}, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if (file.isFile()) {
                fs.stat(filePath + file.name, (err, stats) => {
                    console.log(path.basename(file.name, path.extname(file.name)) + ' - ' + path.extname(file.name).replace(/./, "") + ' - ' + (parseFloat(stats.size) / 1024).toFixed(2) + 'kb');
                });

            }
        })
    }
});