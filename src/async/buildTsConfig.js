const fs = require('fs');
const path = require('path');

function loop(path, collected) {
    return readdir(path)
        .then(function (result) {
            return result.reduce(function (prev, cur) {
                return prev
                    .then(valueFn(stat(cur)))
                    .then(function (stat) {
                        if (stat.isFile()) {
                            if (cur.endsWith('.ts')) {
                                collected.push(cur);
                            }
                            return collected;
                        } else {
                            return loop(cur, collected);
                        }

                    });
            }, Promise.resolve());
        });
}

function valueFn(val) {
    return function () {
        return val;
    }
}
const files = [];

function normalize(dir) {
    return path.normalize(dir).replace(/\\/g, '/');
}
const folder = normalize(__dirname);
loop(folder, files)
    .then(function (result) {
        return writeFile(
                path.resolve(folder, 'tsconfig.json'),
                `
{
    "extends": "../tsconfig-base",
    "compilerOptions": {
        "outDir": "../../async",
        "module": "commonjs",
        "declaration": true,
        "types": [
            "node"
        ],
        "lib": [
            "es5",
            "es6"
        ]
    },
    "files": [
        ${result.map(function(item){return '"' + normalize(item).slice(folder.length+1) + '"';}).join(',\r\n\t\t')}
    ]
}
                    
`)
            .then(ensureAsyncDir)
            .then(copyPackageJson);
    });

function stat(path) {
    return new Promise(function (res, rej) {
        fs.stat(path, function (err, stat) {
            if (err) {
                rej(err);
            } else {
                res(stat);
            }
        });
    })
}

function ensureAsyncDir() {
    const dir = path.resolve(__dirname, '../../async');
    return stat(dir)
        .then(function (stats) {
            if (stats.isDirectory()) {
                return;
            }
            if (stats.isFile()) {
                return new Promise(function (res, rej) {
                    fs.unlink(dir, function (err) {
                        if (err) {
                            rej(err);
                        } else {
                            mkdir(dir).then(res, rej);
                        }
                    })
                });
            }
            throw 'Not file nor folder';
        }, function () {
            return mkdir(dir);
        });
}

function mkdir(dir) {
    return new Promise(function (res, rej) {
        fs.mkdir(dir, function (err) {
            if (err) {
                rej(err);
            } else {
                res();
            }
        })
    })
}

function copyPackageJson() {
    return new Promise(function (res, rej) {
        const origin = path.resolve(__dirname, 'package.json');
        const result = path.resolve(__dirname, '../../async', 'package.json');
        fs.copyFile(origin, result, function (err) {
            if (err) {
                rej(err);
            } else {
                res();
            }
        });
    })
}

function readdir(dir) {
    return new Promise(function (res, rej) {
        fs.readdir(dir, function (err, files) {
            if (err) {
                rej(err);
            } else {
                res(files.map(function (item) {
                    return path.resolve(dir, item);
                }));
            }
        });
    })
}

function writeFile(dir, content) {
    return new Promise(function (res, rej) {
        fs.writeFile(dir, content, function (err) {
            if (err) {
                rej(err);
            } else {
                res();
            }
        });
    })
}
