import { EmptyObject, CallbackFs, Stats, FileSystem, ReadStreamOptions, ReadStream } from "../../definitions";
import * as fs_ from "fs";

export const fs = new EmptyObject() as FileSystem;
const resolve = require("path").resolve;
// tslint:disable-next-line:variable-name
// tslint:disable-next-line:variable-name
const internal_: CallbackFs = {
    readdir: fs_.readdir,
    readFile: fs_.readFile,
    stat: fs_.stat,
    createReadStream: fs_.createReadStream,
    resolve(): void {
        arguments[2](new Error("Resolve not supported"));
    }
};

let readdir = (dir: string): Promise<string[]> => {
    return new Promise((res, rej) => {
        internal_.readdir(dir, (err, result) => {
            if (err) {
                rej(err);
            }
            else {
                if (result.length) {
                    if (result[0].indexOf(dir) === 0) {
                        readdir = directReadDir;
                    }
                    else {
                        readdir = prependReadDir;
                    }
                }
                res(result.map(toResolved, dir));
            }
        });
    });
};
fs.readFile = (fileName: string): Promise<string> => {
    return new Promise((res, rej) => {
        internal_.readFile(fileName, (err: Error, result: Buffer) => {
            if (err) {
                rej(err);
            }
            else {
                res(result.toString("utf-8"));
            }
        });
    });
};
fs.readdir = (dir: string): Promise<string[]> => {
    return readdir(dir);
};
fs.stat = (path: string): Promise<Stats> => {
    return new Promise((res, rej) => {
        internal_.stat(path, (err: Error, result: Stats) => {
            if (err) {
                rej(err);
            }
            else {
                res(result);
            }
        });
    });
};
fs.createReadStream = (path: string, options?: string | ReadStreamOptions): ReadStream => {
    return fs_.createReadStream(path, options);
};
fs.resolve = (fromFolder: string, partialPath: string): Promise<string> => {
    return new Promise((res, rej) => {
        internal_.resolve(fromFolder, partialPath, (err, result) => {
            if (err) {
                rej(err);
            }
            else {
                res(result);
            }
        });
    });
};

export function setFileSystemBackend(method: string, fn: Function): void;
export function setFileSystemBackend(fs: CallbackFs): void;
export function setFileSystemBackend(name: any, factory?: any): void {
    if (typeof name === "object") {
        Object.keys(name).forEach(callSetFsBackend, name);
    }
    else if (typeof name === "string" && typeof factory === "function") {
        if ((internal_ as any)[name]) {
            (internal_ as any)[name] = factory;
        }
    }
}

function callSetFsBackend(this: any, key: string) {
    setFileSystemBackend(key, this[key]);
}


function prependReadDir(dir: string): Promise<string[]> {
    return new Promise((res, rej) => {
        internal_.readdir(dir, (err, result) => {
            if (err) {
                rej(err);
            }
            else {
                res(result.map(toResolved, dir));
            }
        });
    });
}

function toResolved(this: string, cur: string) {
    return resolve(this, cur);
}

function directReadDir(dir: string): Promise<string[]> {
    return new Promise((res, rej) => {
        internal_.readdir(dir, (err, result) => {
            if (err) {
                rej(err);
            }
            else {
                res(result);
            }
        });
    });
}