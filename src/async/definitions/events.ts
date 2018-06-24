/*@internal*/
namespace TsAsync {
    export namespace events {
        // tslint:disable-next-line:class-name
        class internal extends NodeJS.EventEmitter { }

        // export namespace EventEmitter {
        //     export function listenerCount(emitter: EventEmitter, event: string | symbol): number { return 0; }; // deprecated
        //     export function defaultMaxListeners: number;
        // }

        export interface EventEmitter extends internal {

            addListener(event: string | symbol, listener: (...args: any[]) => void): this;
            on(event: string | symbol, listener: (...args: any[]) => void): this;
            once(event: string | symbol, listener: (...args: any[]) => void): this;
            prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
            prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
            removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
            removeAllListeners(event?: string | symbol): this;
            setMaxListeners(n: number): this;
            getMaxListeners(): number;
            listeners(event: string | symbol): Function[];
            emit(event: string | symbol, ...args: any[]): boolean;
            eventNames(): (string | symbol)[];
            listenerCount(type: string | symbol): number;
        }
    }
}