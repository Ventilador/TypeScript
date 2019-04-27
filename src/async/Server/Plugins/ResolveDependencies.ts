import { dirname } from "path";
import { Waterfall } from "../Waterfall";
import { IRequestContext } from "../../definitions";

export function ResolveDependencies() {
    return function ResolveDependencies(this: Waterfall<IRequestContext>, request: IRequestContext) {
        let amount = request.dependencies && request.dependencies.length;
        if (amount) {
            const dir = dirname(request.fileName);
            const resolve = this.resolveFile;
            let async = this.asyncNext();
            request.dependencies.forEach(function (fileName: string, index: number) {
                resolve(dir, fileName, function (err: Error, result: string) {
                    if (async) {
                        if (err) {
                            async(err, undefined);
                            async = undefined as any;
                        }
                        request.dependencies[index] = result;
                        amount--;
                        if (!amount) {
                            async(undefined, request);
                        }
                    }

                });
            });
        } else {
            this.next(undefined, request);
        }
    };
}
