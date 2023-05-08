const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './text.txt');

const readline = require('readline');
const {
    stdin: input,
    stdout: output,
} = require('process');

let writeableStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
    if (answer == "exit" || answer == '') {
        console.log(
            `Bye`
        );
        rl.close();
    }
    else {
        writeableStream.write(answer);
        console.log(
            `Thank you for your valuable feedback: ${answer}`
        );
        rl.close();
    }
});

rl.on('SIGINT', () => {
    console.log(`Bye-bye!`);
    rl.close();
})