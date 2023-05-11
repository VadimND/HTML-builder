const fs = require('fs');
const path = require('path');

const { stdout, stdin } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('What do you think of Node.js?\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit'){
    exitInfo();
  }
  output.write(data);
});

process.on('SIGINT', exitInfo);

function exitInfo(){
  stdout.write('Bye!');
  process.exit();
}