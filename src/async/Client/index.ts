

namespace TsAsync.Client {
    const fork = require("child_process").fork;
    const EventEmitter = require("events").EventEmitter;
    export function Client() {
        const child = fork("./../Server", [], { execArgv: getExecArgv(), silent: true });
        const connector = Connector(child.stdout, child.stdin);
        return connector;
    }
    export class ClientHandler extends EventEmitter {
        constructor(public connector: MessageConnector) {
            super();
            const manager = ClientMessageManager(this);
            connector.onData((val: Buffer) => {
                Parser.fromBuffer(val, manager);
            });
        }
    }
    function getExecArgv() {
        const execArgv = [];
        for (let _i = 0, _a = process.execArgv; _i < _a.length; _i++) {
            const arg = _a[_i];
            const match = /^--(inspect(?:-brk)?)(=(\d+))?$/.exec(arg);
            if (match) {
                const currentPort = match[3] !== undefined ? +match[3] : 9229;
                execArgv.push("--" + match[1] + "=" + (currentPort + 1));
            }
            else {
                execArgv.push(arg);
            }
        }

        return execArgv;
    }

}