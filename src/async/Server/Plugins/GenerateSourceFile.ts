import * as ts from "./../../../../lib/typescript";
import { Waterfall } from "../Waterfall";
import { IRequestContext } from "../../definitions";
let key: ts.DocumentRegistryBucketKey = undefined as any;
export function GenerateSourceFile(this: Waterfall<IRequestContext>, request: IRequestContext) {
    key = key || this.docReg.getKeyForCompilationSettings(this.options);
    request.sourceFile = this.docReg.updateDocumentWithKey(request.fileName, this.docReg.toPath(request.fileName), this.options, key, this.host.getScriptSnapshot(request.fileName), this.host.getScriptVersion(request.fileName), ts.ScriptKind.TS);
    this.next(undefined, request);
}