import { Event } from "./../../definitions";
import { HandlerClass } from "./../index";
import { fs } from "./../Classes/FileSystem";

const { normalize, dirname } = require("path");
export function Init(context: any) {
    context[Event.Init.toString()] = onInit;
    return context;
}
function onInit(this: HandlerClass, configPath: string, tsPath: string) {
    fs.readFile(configPath)
        .then((content: string) => {
            const jsonConfigFile = this.ts.parseConfigFileTextToJson(configPath, content);
            const compilerConfig = this.ts.parseJsonConfigFileContent(
                jsonConfigFile.config,
                {
                    fileExists(): boolean {
                        return false;
                    },
                    readDirectory(): string[] { return []; },
                    readFile(): string { return ""; },
                    useCaseSensitiveFileNames: true
                },
                dirname(configPath));
            compilerConfig.fileNames = compilerConfig.fileNames.map(normalize);
        });
    this.ts = require(tsPath);
}