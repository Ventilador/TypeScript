// import { makeWaterfall } from "./../../../utils/waterfall";
import { TryGetFromMemory } from "./TryGetFromMemory";
import { FindDirectory } from "./FindDirectory";
import { LocateMainFile } from "./LocateMainFile";
import { IRequestContext, ICallback } from "../../../definitions";
import { Waterfall } from "../../Waterfall";

export function LoadNodeModulesCreator(this: Waterfall<void>, applyParent: (startingRequest: IRequestContext, next?: ICallback<IRequestContext>) => void) {
    const resolverWaterfall = makeWaterfall<IResolveContext>([
        TryGetFromMemory,
        FindDirectory,
        LocateMainFile,
        _ => applyNext
    ]);
    return function LoadNodeModules(this: Waterfall<IRequestContext>, request: IRequestContext) {
        const nodeModules: string[] = request.dependencies.filter(isNodeModule, true);
        request.dependencies = request.dependencies.filter(isNodeModule, false);
        if (nodeModules.length) {
            nodeModules.forEach(resolveNodeModule);
        }
        this.next(undefined, request);
    };

    function applyNext(this: Waterfall<IResolveContext>, request: IResolveContext) {
        if (request.mainFile) {
            callParentWith(request.mainFile);
        }
        this.next(undefined, request);
    }
    function callParentWith(item: string) {
        applyParent({
            fileName: item,
            data: "",
            output: "",
            sourceFile: undefined as any,
            sourceMap: "",
            dependencies: []
        }, function (err: Error, result: IRequestContext) {
            if (err) {
                return;
            }
            if (result.dependencies.length) {
                result.dependencies.map(toDts).filter(Boolean).forEach(callParentWith);
            }
        });
    }
    function toDts(item: string) {
        if (item.endsWith(".d.ts")) {
            return item;
        }
        if (item.endsWith(".js")) {
            return item.replace(".js", ".d.ts");
        }
        if (item.endsWith(".ts")) {
            return item.replace(".ts", ".d.ts");
        }
        return false;
    }
    function resolveNodeModule(module: string) {
        resolverWaterfall({
            module: module,
            mainFile: "",
            resolved: false,
            resolving: null,
            modulePath: "",
            $$reject: null,
            $$resolve: null,
            dependencies: []
        });
    }
}



function isNodeModule(this: boolean, item: string) {
    return this === (item[0] !== "." && item[0] !== "/");
}
