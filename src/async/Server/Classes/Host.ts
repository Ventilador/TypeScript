import { Module } from "./Module";
import { Directory } from "./Directory";
import { fs } from "./FileSystem";
import { CompilerOptions } from "typescript";
import * as ts from "typescript";

export class Host {
    private ts: typeof ts;
    getCustomTransformers: any;
    private filterFiles: (module: Module) => boolean;
    constructor(filesRegex: RegExp) {
        this.filterFiles = (module: Module) => {
            return filesRegex.test(module.fileName);
        };
    }
    fileExists = Directory.has;
    directoryExists = Directory.has;
    getScriptFileNames() { return Directory.filter(this.filterFiles); }
    private _compilerOptions: CompilerOptions = undefined as any;
    private _projectVersion = 0;
    private _nodeModules = "";
    private _context = "";
    readDirAsync = fs.readdir;
    stat = fs.stat;
    resolve = fs.resolve;
    readFileAsync(fileName: string) {
        let result = Directory.get(fileName);
        if (!result) {
            result = Directory.set(fileName, new Module(fileName));
        }
        if (result.content) {
            return Promise.resolve(result.content);
        }
        else if (result.working) {
            return result.working
                .then(() => this.readDirAsync(fileName));
        }
        return result && (result.working = fs.readFile(fileName)
            .then(content => result && (result.content = content)));
    }

    getProjectVersion() { return this._projectVersion.toString(); }
    getCompilationSettings() { return this._compilerOptions; }
    getNodeModules() { return this._nodeModules; }
    getCurrentDirectory() { return this._context; }
    getScriptVersion(fileName: string) {
        const file = Directory.get(fileName);
        if (file) {
            return file.version.toString();
        }
        fileName = fileName;
    }

    getScriptSnapshot(fileName: string) {
        const file = Directory.get(fileName);
        if (file) {
            return file.snapshot;
        }
        fileName = fileName;
    }

    getScriptIsOpen() {
        return true;
    }

    resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string) {
        const compilerOptions = this.getCompilationSettings();
        return typeDirectiveNames.map(directive =>
            this.ts.resolveTypeReferenceDirective(directive, containingFile, compilerOptions, this as any)
                .resolvedTypeReferenceDirective) as ts.ResolvedTypeReferenceDirective[];
    }

    resolveModuleNames(moduleNames: string[], containingFile: string) {
        return moduleNames.map(module => Directory.resolve(module, containingFile))
            .map(item => {
                if (item && item.resolvedFileName && item.resolvedFileName.startsWith(Directory.NODE_MODULES)) {
                    const request = Directory.get(item.resolvedFileName);
                    if (request) {
                        item.resolvedFileName = request.fullPath || item.resolvedFileName;
                    }
                }
                return item;
            });
    }

    log(message: string) {
        console.log(message);
    }


    readFile(fileName: string) {
        return Directory.get(fileName).content;
    }

    readDirectory(path: string) {
        return Directory.getDir(path);
    }

    getDefaultLibFileName(options: ts.CompilerOptions) {
        return this.ts.getDefaultLibFilePath(options);
    }
    useCaseSensitiveFileNames() {
        return true;
    }
    // writeFile(fileName: string, fileContent?: string) {

    // }
    directory() {
        return Directory;
    }
}
export type Directory = typeof Directory;