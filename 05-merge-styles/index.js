const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, './styles/');
const destPath = path.join(__dirname, './project-dist/');

fs.readdir(srcPath, {
    withFileTypes: true
}, (err, files) => {
    if (err)
        console.log(err);
    else {

        fs.stat(path.join(destPath, 'bundle.css'), function(err, stat) {
            if(err == null) {
                fs.unlink(path.join(destPath, 'bundle.css'), (err) => {
                    if (err) throw err;
                });
            }
        });
        files.forEach((file, idx) => {
            if (file.isFile() && path.extname(file.name) == '.css') {
                try {
                    fs.readFile(srcPath + '/' + file.name, { encoding: 'utf-8' }, function (err, data) {
                        if (!err) {
                            fs.appendFileSync(destPath + 'bundle.css', data, function (err) {
                                if (err) throw err;
                            });
                        } else {
                            console.log(err);
                        }
                    });

                } catch (err) {
                    console.error(err);
                }
            }
        })
    }
});