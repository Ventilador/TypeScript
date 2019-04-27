import { transpile } from "./Transpiler";
import { Waterfall } from "../Waterfall";
import { IRequestContext } from "../../definitions";
const DefinitionReg = /\.d\.tsx?$/;
export function TranspileFile() {
    return function TranspileFile(this: Waterfall<IRequestContext>, request: IRequestContext) {
        if (DefinitionReg.test(request.fileName)) {
            return this.next(undefined, request);
        }
        const result = transpile(request.sourceFile as any, {
            fileName: request.fileName,
            reportDiagnostics: false,
            compilerOptions: this.options
        });
        request.output = result.outputText || '';
        request.sourceMap = result.sourceMapText || '';
        this.next(undefined, request);
    };
}
