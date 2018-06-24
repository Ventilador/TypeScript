/*@internal*/
namespace TsAsync {
    export namespace qs {
        export interface StringifyOptions {
            encodeURIComponent?: Function;
        }

        export interface ParseOptions {
            maxKeys?: number;
            decodeURIComponent?: Function;
        }

        export interface ParsedUrlQuery { [key: string]: string | string[]; }

    }
    // tslint:disable-next-line:class-name
    export interface qs {
        stringify<T>(obj: T, sep?: string, eq?: string, options?: qs.StringifyOptions): string;
        parse(str: string, sep?: string, eq?: string, options?: qs.ParseOptions): qs.ParsedUrlQuery;
        parse<T extends {}>(str: string, sep?: string, eq?: string, options?: qs.ParseOptions): T;
        escape(str: string): string;
        unescape(str: string): string;
    }
}