const fs = require('fs');
const path = require('path');
const root = __dirname;
const copyroot = path.join(root, '.\\project-dist');
console.log(path.resolve(__dirname, './test', '/second.html'));
async function emptyDir(folder) {
    let files = [];
    try {
        files = await fs.promises.readdir(folder, {
            withFileTypes: true
        });
    } catch (e) {
        return;
    }

    for (let file of files) {
        if (file.isFile()) {
            await fs.promises.unlink(path.join(folder, file.name));
        }
        if (file.isDirectory()) {
            await emptyDir(path.join(folder, file.name));
        }
    }

    await fs.promises.rmdir(folder);
}

const duplicate = (dir, copydir) => {
    fs.mkdir(path.join(copydir), {
        recursive: true
    }, () => {
        fs.promises.readdir(path.join(dir), {
                withFileTypes: true
            })
            .then(files => files.forEach(file => {
                if (file.isDirectory()) {
                    duplicate(path.join(dir, '.\\', file.name), path.join(copydir, '.\\', file.name));
                }
                if (file.isFile()) {
                    fs.promises.copyFile(path.join(dir, '.\\', file.name), path.join(copydir, '.\\', file.name));
                }
            }));
    });
};

const joinCss = (sourceroot, result) => {
    const style = [];
    const styleswritable = fs.createWriteStream(result, 'utf-8');
    fs.promises.readdir(sourceroot, {
            withFileTypes: true
        })
        .then(files => files.forEach(file => {
            const curroot = path.join(sourceroot, '\\', file['name']);
            if (file['name'].slice(-3) === 'css') {
                const readable = fs.createReadStream(curroot, 'utf-8');
                readable.on('data', data => {
                    style.push(data);
                });
                readable.on('end', () => {
                    styleswritable.write(style.flat().join('\n'), 'utf-8');
                });
            }
        }));
};

async function generateHtml(templateFile, source, destination) {
    const htmlWrite = fs.createWriteStream(destination, 'utf-8');
    const files = await fs.promises.readdir(source, {
        withFileTypes: true
    });
    const params = {};
    for (const file of files) {
        if (file.name.slice(-4) === 'html') {
            const paramName = file.name.slice(0, -5);
            const paramValue = (await fs.promises.readFile(path.join(source, file.name))).toString();
            params[paramName] = paramValue;
        }
    }

    const template = (await fs.promises.readFile(templateFile)).toString();
    let result = template;
    Object.keys(params).forEach(key => {
        result = result.replaceAll('{{' + key + '}}', params[key]);
    });
    htmlWrite.write(result, 'utf-8');
}

async function joinHtml() {
    await emptyDir(path.join(root, '.\\project-dist\\'), );
    await fs.promises.mkdir(path.join(root, '.\\project-dist'), {
        recursive: true
    });
    duplicate(path.join(root, '.\\', 'assets'), path.join(copyroot, '.\\', 'assets'));
    joinCss(path.join(root, '.\\styles'), path.join(root, '.\\project-dist\\style.css'));
    await generateHtml(path.join(root, '.\\template.html'), path.join(root, '.\\components'), path.join(copyroot, '.\\index.html'));
}

joinHtml();