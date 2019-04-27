import { basename } from "path";
export class Module {
    version: string;
    sourceFile: any;
    snapshot: any;
    fileName: string;
    content: string;
    working: Promise<any> | undefined;
    constructor(public fullPath: string) {
        this.fileName = basename(fullPath);
        this.version = "0";
        this.content = "";
        this.working = undefined;
    }
    read(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    readSync(): string {
        throw new Error("Method not implemented.");
    }
    compile(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    compileSync(): string {
        throw new Error("Method not implemented.");
    }
    readDefinition(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    readDefinitionSync(): string {
        throw new Error("Method not implemented.");
    }


}