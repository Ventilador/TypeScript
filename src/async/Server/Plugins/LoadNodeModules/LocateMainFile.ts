import { readdir, stat } from "fs";
import { resolve } from "path";
import { Waterfall } from "../../Waterfall";
export function LocateMainFile(this: Waterfall<IResolveContext>) {
    // const host = this.host;
    return function LocateMainFile(this: Waterfall<IResolveContext>, request: IResolveContext) {
        if (!request.modulePath) {
            this.next(undefined, request);
            return;
        }
        const async = this.asyncNext();
        readdir(request.modulePath, function (err: Error, list: string[]) {
            if (err) {
                async(err);
            }
            for (let ii = 0; ii < list.length; ii++) {
                const cur = list[ii];
                if (cur === "index.d.ts") {
                    request.mainFile = resolve(request.modulePath, cur);
                    async(undefined, request);
                    return;
                } else if (cur === "package.json") {
                    const path = resolve(request.modulePath, cur)
                    const obj = require(path);
                    // host.writeFile(path, JSON.stringify(obj))
                    if (obj) {
                        if (obj.typings) {
                            request.mainFile = resolve(request.modulePath, obj.typings);
                            async(undefined, request);
                            return;
                        } else if (obj.main) {
                            const path = resolve(request.modulePath, obj.main).replace(/\.js$/, ".d.ts");
                            stat(path, function (err: Error, stats: any) {
                                if (!err && stats.isFile()) {
                                    request.mainFile = path;
                                    async(undefined, request);
                                } else {
                                    request.mainFile = '';
                                    async(undefined, request);
                                }
                            });
                            return;
                        }
                    }
                }
            }
            async(undefined, request);
        });
    };

}
