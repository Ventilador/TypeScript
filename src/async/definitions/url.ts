/*@internal*/
namespace TsAsync {
    // tslint:disable-next-line:class-name
    export interface url {
        parse(urlStr: string, parseQueryString?: false | undefined, slashesDenoteHost?: boolean): url.UrlWithStringQuery;
        parse(urlStr: string, parseQueryString: true, slashesDenoteHost?: boolean): url.UrlWithParsedQuery;
        parse(urlStr: string, parseQueryString: boolean, slashesDenoteHost?: boolean): url.Url;

        format(URL: url.URL, options?: url.URLFormatOptions): string;
        format(urlObject: url.UrlObject | string): string;
        resolve(from: string, to: string): string;
    }
    export namespace url {

        export interface UrlObjectCommon {
            auth?: string;
            hash?: string;
            host?: string;
            hostname?: string;
            href?: string;
            path?: string;
            pathname?: string;
            protocol?: string;
            search?: string;
            slashes?: boolean;
        }

        // Input to `url.format`
        export interface UrlObject extends UrlObjectCommon {
            port?: string | number;
            query?: string | null | { [key: string]: any };
        }

        // Output of `url.parse`
        export interface Url extends UrlObjectCommon {
            port?: string;
            query?: string | null | qs.ParsedUrlQuery;
        }

        export interface UrlWithParsedQuery extends Url {
            query: qs.ParsedUrlQuery;
        }

        export interface UrlWithStringQuery extends Url {
            query: string | null;
        }



        export interface URLFormatOptions {
            auth?: boolean;
            fragment?: boolean;
            search?: boolean;
            unicode?: boolean;
        }

        export interface URLSearchParams extends Iterable<[string, string]> {
            append(name: string, value: string): void;
            delete(name: string): void;
            entries(): IterableIterator<[string, string]>;
            forEach(callback: (value: string, name: string) => void): void;
            get(name: string): string | null;
            getAll(name: string): string[];
            has(name: string): boolean;
            keys(): IterableIterator<string>;
            set(name: string, value: string): void;
            sort(): void;
            toString(): string;
            values(): IterableIterator<string>;
            [Symbol.iterator](): IterableIterator<[string, string]>;
        }

        export interface URL {
            hash: string;
            host: string;
            hostname: string;
            href: string;
            readonly origin: string;
            password: string;
            pathname: string;
            port: string;
            protocol: string;
            search: string;
            readonly searchParams: URLSearchParams;
            username: string;
            toString(): string;
            toJSON(): string;
        }
    }
}