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
                console.log(path.basename(file.name, path.extname(file.name)) + ' - ' + path.extname(file.name).replace(/./, "") + ' - ' + (parseFloat(fs.statSync(filePath + file.name).size)/1024).toFixed(2) + 'kb');                
            }
        })
    }
});

