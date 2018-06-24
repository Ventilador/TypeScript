namespace TsAsync {
    export interface QueueItem<T> {
        next: QueueItem<T>;
        val: T;
    }
    export class Queue<T> {
        protected _first: QueueItem<T>;
        protected _last: QueueItem<T>;
        constructor() {
            this._first = this._last = NULL;
        }
        take(): T {
            let val: T = NULL;
            if (this._first) {
                val = this._first && this._first.val;
                this._first = this._first.next;
            }
            if (!this._first) {
                this._first = this._last = NULL;
            }
            return val;
        }
        put(val: T) {
            if (this._last) {
                this._last = (this._last.next = {
                    val,
                    next: NULL
                });
            }
            else {
                this._first = this._last = {
                    val,
                    next: NULL
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
            this._first = this._last = NULL;
            if (cur) {
                do {
                    cb(cur.val);
                } while (cur = cur.next);
            }
        }
    }
}