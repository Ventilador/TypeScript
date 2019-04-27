import { dirname } from "path";
import { Waterfall } from "../../Waterfall";
const keys = ["$$resolve", "resolving"]; export function TryGetFromMemory() {
    return function TryGetFromMemory(this: Waterfall<IResolveContext>, request: IResolveContext) {
        const dir = this.host.directory();
        const moduleResolution = dir.resolve(request.module, "");
        const node = dir.get(moduleResolution.resolvedFileName);
        if (node) {
            return this.bail(undefined);
        }
        dir.set(moduleResolution.resolvedFileName, request);
        request.modulePath = dirname(moduleResolution.resolvedFileName);
        this.next(undefined, request);
    };

}
