export interface QueueItem<T> {
    next: QueueItem<T>;
    val: T;
}
export class Queue<T> {
    protected _first: QueueItem<T>;
    protected _last: QueueItem<T>;
    constructor() {
        this._first = this._last = undefined as any;
    }
    take(): T {
        let val: T = undefined as any;
        if (this._first) {
            val = this._first && this._first.val;
            this._first = this._first.next;
        }
        if (!this._first) {
            this._first = this._last = undefined as any;
        }
        return val;
    }
    put(val: T) {
        if (this._last) {
            this._last = (this._last.next = {
                val,
                next: undefined as any
            });
        }
        else {
            this._first = this._last = {
                val,
                next: undefined as any
            };
        }
    }
    empty() {
        return !this._first;
    }
}

export class FlushableQueue<T> extends Queue<T> {
    constructor() {
        super();
    }
    public flush(cb: Function) {
        let cur = this._first;
        // clearing the queue, before starting flushing,. so any sync operation will be pushed to the next setImmediate
        // hence being applied async
        this._first = this._last = undefined as any;
        if (cur) {
            do {
                cb(cur.val);
            } while (cur = cur.next);
        }
    }
}