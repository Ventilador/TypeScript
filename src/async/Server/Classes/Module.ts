namespace TsAsync.Server {
    const path = require("path");
    export class Module {
        version: string;
        sourceFile: any;
        snapshot: any;
        fileName: string;
        content: string;
        working: Promise<any> | null;
        constructor(public fullPath: string) {
            this.fileName = path.basename(fullPath);
            this.version = "0";
            this.content = "";
            this.working = NULL;
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
}