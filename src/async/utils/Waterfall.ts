namespace TsAsync {
    let id = 0;
    export class Waterfall<T> {
        public _apply: Function;
        public nodeModules: string;
        public typeFolders: string[];
        public readFile: any;
        public resolveFile: any;
        public options: ts.CompilerOptions;
        public host: Server.Host;
        public docReg: DocumentRegistry;
        public id = id++;
        private _index: number;
        private _current: T | null;
        private _error: Error | null;
        private _finished: boolean;
        private _methods: Function[];
        constructor(methods: Function[], startingRequest: T) {
            this._index = 0;
            this._current = startingRequest;
            this._finished = false;
            this._error = NULL;
            this._methods = methods;
            this._apply = () => {
                if (this._finished) {
                    return;
                }
                try {
                    this._methods[this._index].call(this, this._current);
                }
                catch (err) {
                    this.next(err, NULL);
                }
            };
            onNextTick(this._apply);
        }
        asyncBail() {
            return Object.assign((...args: any[]) => {
                this.bail.apply(this, args);
            }, ext);
        }
        asyncNext() {
            return Object.assign((...args: any[]) => {
                this.next.apply(this, args);
            }, ext);
        }
        bail(err: Error, result: T) {
            this.next(err, result);
            this._finished = true;
        }
        next(err: Error | null, result: T | null) {
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
            this(NULL, result);
        };
    }
}