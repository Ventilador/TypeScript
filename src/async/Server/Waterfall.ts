import { DocumentRegistry } from "../definitions";
import { CompilerOptions } from "typescript";
import { Host } from "./Classes/Host";
import { FlushableQueue } from "../utils/Collections";

let id = 0;
export class Waterfall<T> {
    public _apply: Function;
    public nodeModules: string;
    public typeFolders: string[];
    public readFile: any;
    public resolveFile: any;
    public options: CompilerOptions;
    public host: Host;
    public docReg: DocumentRegistry;
    public id = id++;
    private _index: number;
    private _current: T | undefined;
    private _error: Error | undefined;
    private _finished: boolean;
    private _methods: Function[];
    constructor(methods: Function[], startingRequest: T) {
        this._index = 0;
        this._current = startingRequest;
        this._finished = false;
        this._error = undefined as any;
        this._methods = methods;
        this._apply = () => {
            if (this._finished) {
                return;
            }
            try {
                this._methods[this._index].call(this, this._current);
            }
            catch (err) {
                this.next(err, undefined as any);
            }
        };
        onNextTick(this._apply);
    }
    asyncBail() {
        return Object.assign(this.bail.apply.bind(this), ext);
    }
    asyncNext() {
        return Object.assign(this.next.apply.bind(this), ext);
    }
    bail(err: Error | undefined, result?: T) {
        this.next(err, result);
        this._finished = true;
    }
    next(err: Error | undefined, result?: T | undefined) {
        if (this._finished) {
            return;
        }
        if (err) {
            this._finished = true;
            this._error = err;
            this.report();
        }
        else {
            this._current = result;
            if ((++this._index) === this._methods.length) {
                this._finished = true;
            }
        }
        onNextTick(this._apply);
    }
    public report() {
        return this._error;
    }
}
const myQueue = new FlushableQueue();
myQueue.flush = myQueue.flush.bind(myQueue);
export function onNextTick(cb: Function) {
    if (myQueue.empty()) {
        setImmediate(myQueue.flush);
    }
    myQueue.put(cb);
}
const ext = {
    resolver
};
function resolver(this: any) {
    return (result: any) => {
        this(undefined, result);
    };
}