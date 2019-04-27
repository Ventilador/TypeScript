import * as ts from "typescript";
import { EventEmitter } from "events";
import { Connector } from "../Connector";
import { Parser } from "../utils/BufferConnector";
import { ServerMessageManager } from "./Messages";
import { CustomBuffer } from "../definitions";
export class HandlerClass extends EventEmitter {
    public ts: typeof ts = undefined as any;
    public methods: Function[];
    public connector = Connector(process.stdin as any, process.stdout as any);
    constructor() {
        super();
        const manager = ServerMessageManager(this);
        this.connector.onData((chunk: CustomBuffer) => {
            Parser.fromBuffer(chunk, manager);
        });
    }

    public process(fileName: string, content: string) {
        this.emit("drop", {
            fileName,
            data: content,
            output: "",
            sourceFile: undefined,
            sourceMap: "",
            dependencies: undefined
        });
    }
}
/*@internal*/
export const serverHandler = new HandlerClass();