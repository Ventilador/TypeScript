// import { readdir as readdir_ } from "fs";
// import { resolve } from "path";
// import { Waterfall } from "../../../utils/waterfall";
// export function FindDirectory(this: Waterfall<IResolveContext>) {
//     const options = this.host.getCompilationSettings();
//     const host = this.host as any;
//     const nodeModules = host.getNodeModules();
//     const array: string[] = options.typeRoots && options.typeRoots.concat([nodeModules]);
//     return function FindDirectory(this: Waterfall<IResolveContext>, request: IResolveContext) {
//         const async = this.asyncNext();
//         array.reduce(function (prev: Promise<string>, cur: string) {
//             return prev.then(function (path) {
//                 if (path) {
//                     return path;
//                 }
//                 path = resolve(cur, request.module);
//                 if (host.directoryExists(path)) {
//                     return path;
//                 }
//                 return read(cur, request.module);
//             });
//         }, Promise.resolve(""))
//             .then(function (folder) {
//                 request.modulePath = folder;
//                 async(null, request);
//             })
//             .catch(async);
//     };

//     function isEqual(this: string, value: string) {
//         return this === value;
//     }
//     function read(folder, module) {
//         return readdir(folder)
//             .then(list => {
//                 return list.find(isEqual, module) && resolve(folder, module);
//             });
//     }
// }



// function readdir(path) {
//     return new Promise<string[]>(function (res, rej) {
//         readdir_(path, function (err, list) {
//             if (err) {
//                 rej(err);
//             } else {
//                 res(list);
//             }
//         });
//     });
// }
