/*var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, './text.txt');
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);        
    } else {
        console.log(err);
    }
});*/

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './text.txt');
const rr = fs.createReadStream(filePath);

rr.on('readable', () => {
    console.log(`readable: ${rr.read()}`);
});