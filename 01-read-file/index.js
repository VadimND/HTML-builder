const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './text.txt');
const rr = fs.createReadStream(filePath);

rr.on('readable', () => {
    console.log(`readable: ${rr.read()}`);
});