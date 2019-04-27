import { SourceFile, DocumentRegistry, Path } from 'typescript';
import { Stats, ReadStream } from 'fs';
export type SourceFile = SourceFile;
export type DocumentRegistry = DocumentRegistry & { toPath(val: string): Path };
export type Stats = Stats;
export type ReadStream = ReadStream;

export class EmptyObject {
    [key: string]: any; // tslint:disable-line
}
/*@internal*/
export const NULL: any = null; // tslint:disable-line
EmptyObject.prototype = NULL;
export interface CustomBuffer extends NodeBuffer {
    utf8Slice: any;
}

export interface EventEmitter extends NodeJS.EventEmitter {
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
export interface Readable extends NodeJS.ReadableStream {
    readable: boolean;
    _read(size: number): void;
    read(size?: number): any;
    setEncoding(encoding: string): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    unpipe<T extends NodeJS.WritableStream>(destination?: T): this;
    unshift(chunk: any): void;
    wrap(oldStream: NodeJS.ReadableStream): this;
    push(chunk: any, encoding?: string): boolean;
    _destroy(err: Error, callback: Function): void;
    destroy(error?: Error): void;

    /**
     * Event emitter
     * The defined events on documents including:
     * 1. close
     * 2. data
     * 3. end
     * 4. readable
     * 5. error
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close" | "end" | "readable", listener: () => void): this;
    addListener(event: "data", listener: (chunk: Buffer | string) => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close" | "end" | "readable"): boolean;
    emit(event: "data", chunk: Buffer | string): boolean;
    emit(event: "error", err: Error): boolean;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close" | "end" | "readable", listener: () => void): this;
    on(event: "data", listener: (chunk: Buffer | string) => void): this;
    on(event: "error", listener: (err: Error) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "close" | "end" | "readable", listener: () => void): this;
    once(event: "data", listener: (chunk: Buffer | string) => void): this;
    once(event: "error", listener: (err: Error) => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "close" | "end" | "readable", listener: () => void): this;
    prependListener(event: "data", listener: (chunk: Buffer | string) => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "close" | "end" | "readable", listener: () => void): this;
    prependOnceListener(event: "data", listener: (chunk: Buffer | string) => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;

    removeListener(event: string, listener: (...args: any[]) => void): this;
    removeListener(event: "close" | "end" | "readable", listener: () => void): this;
    removeListener(event: "data", listener: (chunk: Buffer | string) => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
}
export interface Writable extends NodeJS.WritableStream {
    writable: boolean;
    _write(chunk: any, encoding: string, callback: (err?: Error) => void): void;
    _writev?(chunks: { chunk: any, encoding: string }[], callback: (err?: Error) => void): void;
    _destroy(err: Error, callback: Function): void;
    _final(callback: Function): void;
    write(chunk: any, cb?: Function): boolean;
    write(chunk: any, encoding?: string, cb?: Function): boolean;
    setDefaultEncoding(encoding: string): this;
    end(cb?: Function): void;
    end(chunk: any, cb?: Function): void;
    end(chunk: any, encoding?: string, cb?: Function): void;
    cork(): void;
    uncork(): void;
    destroy(error?: Error): void;

    /**
     * Event emitter
     * The defined events on documents including:
     * 1. close
     * 2. drain
     * 3. error
     * 4. finish
     * 5. pipe
     * 6. unpipe
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close" | "drain" | "finish", listener: () => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close" | "finish"): boolean;
    emit(event: "drain", chunk: Buffer | string): boolean;
    emit(event: "error", err: Error): boolean;
    emit(event: "pipe" | "unpipe", src: Readable): boolean;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close" | "drain" | "finish", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;


    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "close" | "drain" | "finish", listener: () => void): this;
    once(event: "error", listener: (err: Error) => void): this;
    once(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;


    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "close" | "drain" | "finish", listener: () => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;
    prependListener(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;


    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "close" | "drain" | "finish", listener: () => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;
    prependOnceListener(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;


    removeListener(event: string, listener: (...args: any[]) => void): this;
    removeListener(event: "close" | "drain" | "finish", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
    removeListener(event: "unpipe" | "pipe", listener: (src: Readable) => void): this;

}

export interface Dictionary<T> {
    [key: string]: T;
}
/*@internal*/
export interface RequestContext {
    fileName?: string;
    data?: string;
    sourceFile?: SourceFile;
    sourceMap?: string;
    output?: string;
    dependencies?: any;
}
/*@internal*/
export interface MessageHandler {
    message: Event;
    processor(buf: Buffer): Buffer;
}


export interface MessageConnector {
    onData: (cbToCall: (val: Buffer) => void) => () => void;
    sendData: (buf: Buffer) => void;
}

export const enum Event {
    ProcessFile,
    Init
}
export interface Handler extends NodeJS.EventEmitter { }

// file system


export interface FileSystem {
    createReadStream(file: string, options?: string | ReadStreamOptions): ReadStream;
    readFile(fileName: string): Promise<string>;
    readdir(dir: string): Promise<string[]>;
    stat(path: string): Promise<Stats>;
    resolve(fromFolder: string, partialPath: string): Promise<string>;
}
export interface CallbackFs {
    readdir(path: string, callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    readFile(path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    stat(path: string, callback: (err: NodeJS.ErrnoException, stats: Stats) => void): void;
    createReadStream(file: string, options?: string | ReadStreamOptions): ReadStream;
    resolve(fromFolder: string, partialPath: string, callback: (err: NodeJS.ErrnoException, path: string) => void): void;
}
export interface ReadStreamOptions {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
}

export interface IRequestContext {
    fileName: string;
    data: string;
    sourceFile: SourceFile;
    sourceMap: string;
    output: string;
    dependencies: any;
}

export interface ICallback<T> {
    (error: Error, result?: T): void;
}
