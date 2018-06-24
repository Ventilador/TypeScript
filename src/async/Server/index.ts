namespace TsAsync.Server {
    const EventEmitter = require("events").EventEmitter;
    export class HandlerClass extends EventEmitter {
        public ts: ts = NULL;
        public methods: Function[];
        public connector = Connector(process.stdin as any, process.stdout as any);
        constructor() {
            super();
            const manager = ServerMessageManager(this);
            this.connector.onData((chunk: Buffer) => {
                Parser.fromBuffer(chunk, manager);
            });
        }

        public process(fileName: string, content: string) {
            this.emit("drop", {
                fileName,
                data: content,
                output: "",
                sourceFile: NULL,
                sourceMap: "",
                dependencies: NULL
            });
        }
    }
    /*@internal*/
    export const serverHandler = new HandlerClass();
}