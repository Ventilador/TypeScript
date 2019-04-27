
// export namespace fs {
//     export type PathLike = string | Buffer | url.URL;
//     export interface Stats {
//         isFile(): boolean;
//         isDirectory(): boolean;
//         isBlockDevice(): boolean;
//         isCharacterDevice(): boolean;
//         isSymbolicLink(): boolean;
//         isFIFO(): boolean;
//         isSocket(): boolean;
//         dev: number;
//         ino: number;
//         mode: number;
//         nlink: number;
//         uid: number;
//         gid: number;
//         rdev: number;
//         size: number;
//         blksize: number;
//         blocks: number;
//         atimeMs: number;
//         mtimeMs: number;
//         ctimeMs: number;
//         birthtimeMs: number;
//         atime: Date;
//         mtime: Date;
//         ctime: Date;
//         birthtime: Date;
//     }
//     export interface FSWatcher extends events.EventEmitter {
//         close(): void;
//         addListener(event: string, listener: (...args: any[]) => void): this;
//         addListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
//         addListener(event: "error", listener: (error: Error) => void): this;

//         on(event: string, listener: (...args: any[]) => void): this;
//         on(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
//         on(event: "error", listener: (error: Error) => void): this;

//         once(event: string, listener: (...args: any[]) => void): this;
//         once(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
//         once(event: "error", listener: (error: Error) => void): this;

//         prependListener(event: string, listener: (...args: any[]) => void): this;
//         prependListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
//         prependListener(event: "error", listener: (error: Error) => void): this;

//         prependOnceListener(event: string, listener: (...args: any[]) => void): this;
//         prependOnceListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
//         prependOnceListener(event: "error", listener: (error: Error) => void): this;
//     }

//     export interface ReadStream extends stream.Readable {
//         close(): void;
//         destroy(): void;
//         bytesRead: number;
//         path: string | Buffer;
//         addListener(event: string, listener: (...args: any[]) => void): this;
//         addListener(event: "open", listener: (fd: number) => void): this;
//         addListener(event: "close", listener: () => void): this;

//         on(event: string, listener: (...args: any[]) => void): this;
//         on(event: "open", listener: (fd: number) => void): this;
//         on(event: "close", listener: () => void): this;

//         once(event: string, listener: (...args: any[]) => void): this;
//         once(event: "open", listener: (fd: number) => void): this;
//         once(event: "close", listener: () => void): this;

//         prependListener(event: string, listener: (...args: any[]) => void): this;
//         prependListener(event: "open", listener: (fd: number) => void): this;
//         prependListener(event: "close", listener: () => void): this;

//         prependOnceListener(event: string, listener: (...args: any[]) => void): this;
//         prependOnceListener(event: "open", listener: (fd: number) => void): this;
//         prependOnceListener(event: "close", listener: () => void): this;
//     }

//     export interface WriteStream extends stream.Writable {
//         close(): void;
//         bytesWritten: number;
//         path: string | Buffer;

//         /**
//          * events.EventEmitter
//          *   1. open
//          *   2. close
//          */
//         addListener(event: string, listener: (...args: any[]) => void): this;
//         addListener(event: "open", listener: (fd: number) => void): this;
//         addListener(event: "close", listener: () => void): this;

//         on(event: string, listener: (...args: any[]) => void): this;
//         on(event: "open", listener: (fd: number) => void): this;
//         on(event: "close", listener: () => void): this;

//         once(event: string, listener: (...args: any[]) => void): this;
//         once(event: "open", listener: (fd: number) => void): this;
//         once(event: "close", listener: () => void): this;

//         prependListener(event: string, listener: (...args: any[]) => void): this;
//         prependListener(event: "open", listener: (fd: number) => void): this;
//         prependListener(event: "close", listener: () => void): this;

//         prependOnceListener(event: string, listener: (...args: any[]) => void): this;
//         prependOnceListener(event: "open", listener: (fd: number) => void): this;
//         prependOnceListener(event: "close", listener: () => void): this;
//     }
//     export interface Constants {
//         /** Constant for fs.access(). File is visible to the calling process. */
//         F_OK: number;

//         /** Constant for fs.access(). File can be read by the calling process. */
//         R_OK: number;

//         /** Constant for fs.access(). File can be written by the calling process. */
//         W_OK: number;

//         /** Constant for fs.access(). File can be executed by the calling process. */
//         X_OK: number;

//         // File Open Constants

//         /** Constant for fs.open(). Flag indicating to open a file for read-only access. */
//         O_RDONLY: number;

//         /** Constant for fs.open(). Flag indicating to open a file for write-only access. */
//         O_WRONLY: number;

//         /** Constant for fs.open(). Flag indicating to open a file for read-write access. */
//         O_RDWR: number;

//         /** Constant for fs.open(). Flag indicating to create the file if it does not already exist. */
//         O_CREAT: number;

//         /** Constant for fs.open(). Flag indicating that opening a file should fail if the O_CREAT flag is set and the file already exists. */
//         O_EXCL: number;

//         /** Constant for fs.open(). Flag indicating that if path identifies a terminal device, opening the path shall not cause that terminal to become the controlling terminal for the process (if the process does not already have one). */
//         O_NOCTTY: number;

//         /** Constant for fs.open(). Flag indicating that if the file exists and is a regular file, and the file is opened successfully for write access, its length shall be truncated to zero. */
//         O_TRUNC: number;

//         /** Constant for fs.open(). Flag indicating that data will be appended to the end of the file. */
//         O_APPEND: number;

//         /** Constant for fs.open(). Flag indicating that the open should fail if the path is not a directory. */
//         O_DIRECTORY: number;

//         /** Constant for fs.open(). Flag indicating reading accesses to the file system will no longer result in an update to the atime information associated with the file. This flag is available on Linux operating systems only. */
//         O_NOATIME: number;

//         /** Constant for fs.open(). Flag indicating that the open should fail if the path is a symbolic link. */
//         O_NOFOLLOW: number;

//         /** Constant for fs.open(). Flag indicating that the file is opened for synchronous I/O. */
//         O_SYNC: number;

//         /** Constant for fs.open(). Flag indicating that the file is opened for synchronous I/O with write operations waiting for data integrity. */
//         O_DSYNC: number;

//         /** Constant for fs.open(). Flag indicating to open the symbolic link itself rather than the resource it is pointing to. */
//         O_SYMLINK: number;

//         /** Constant for fs.open(). When set, an attempt will be made to minimize caching effects of file I/O. */
//         O_DIRECT: number;

//         /** Constant for fs.open(). Flag indicating to open the file in nonblocking mode when possible. */
//         O_NONBLOCK: number;

//         // File Type Constants

//         /** Constant for fs.Stats mode property for determining a file's type. Bit mask used to extract the file type code. */
//         S_IFMT: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a regular file. */
//         S_IFREG: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a directory. */
//         S_IFDIR: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a character-oriented device file. */
//         S_IFCHR: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a block-oriented device file. */
//         S_IFBLK: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a FIFO/pipe. */
//         S_IFIFO: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a symbolic link. */
//         S_IFLNK: number;

//         /** Constant for fs.Stats mode property for determining a file's type. File type constant for a socket. */
//         S_IFSOCK: number;

//         // File Mode Constants

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by owner. */
//         S_IRWXU: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by owner. */
//         S_IRUSR: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by owner. */
//         S_IWUSR: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by owner. */
//         S_IXUSR: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by group. */
//         S_IRWXG: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by group. */
//         S_IRGRP: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by group. */
//         S_IWGRP: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by group. */
//         S_IXGRP: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by others. */
//         S_IRWXO: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by others. */
//         S_IROTH: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by others. */
//         S_IWOTH: number;

//         /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by others. */
//         S_IXOTH: number;

//         /** Constant for fs.copyFile. Flag indicating the destination file should not be overwritten if it already exists. */
//         COPYFILE_EXCL: number;
//     }
// }
// // tslint:disable-next-line:class-name
// export interface fs {
//     chown(path: fs.PathLike, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     chownSync(path: fs.PathLike, uid: number, gid: number): void;
//     fchown(fd: number, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     fchownSync(fd: number, uid: number, gid: number): void;
//     lchown(path: fs.PathLike, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     lchownSync(path: fs.PathLike, uid: number, gid: number): void;
//     chmod(path: fs.PathLike, mode: string | number, callback: (err: NodeJS.ErrnoException) => void): void;
//     chmodSync(path: fs.PathLike, mode: string | number): void;
//     fchmod(fd: number, mode: string | number, callback: (err: NodeJS.ErrnoException) => void): void;
//     fchmodSync(fd: number, mode: string | number): void;
//     lchmod(path: fs.PathLike, mode: string | number, callback: (err: NodeJS.ErrnoException) => void): void;
//     lchmodSync(path: fs.PathLike, mode: string | number): void;
//     stat(path: fs.PathLike, callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => void): void;
//     statSync(path: fs.PathLike): fs.Stats;
//     fstat(fd: number, callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => void): void;
//     fstatSync(fd: number): fs.Stats;
//     lstat(path: fs.PathLike, callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => void): void;
//     lstatSync(path: fs.PathLike): fs.Stats;
//     link(existingPath: fs.PathLike, newPath: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     linkSync(existingPath: fs.PathLike, newPath: fs.PathLike): void;
//     watch(filename: fs.PathLike, options: { encoding: "buffer", persistent?: boolean, recursive?: boolean } | "buffer", listener?: (event: string, filename: Buffer) => void): fs.FSWatcher;
//     watch(filename: fs.PathLike, options: { encoding?: string | null, persistent?: boolean, recursive?: boolean } | string | null, listener?: (event: string, filename: string | Buffer) => void): fs.FSWatcher;
//     watch(filename: fs.PathLike, listener?: (event: string, filename: string) => any): fs.FSWatcher;
//     watch(filename: fs.PathLike, options: { encoding?: BufferEncoding | null, persistent?: boolean, recursive?: boolean } | BufferEncoding | undefined | null, listener?: (event: string, filename: string) => void): fs.FSWatcher;
//     exists(path: fs.PathLike, callback: (exists: boolean) => void): void;
//     existsSync(path: fs.PathLike): boolean;
//     access(path: fs.PathLike, mode: number | undefined, callback: (err: NodeJS.ErrnoException) => void): void;
//     access(path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     accessSync(path: fs.PathLike, mode?: number): void;
//     rename(oldPath: fs.PathLike, newPath: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     renameSync(oldPath: fs.PathLike, newPath: fs.PathLike): void;
//     ftruncate(fd: number, len: number | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     ftruncate(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     ftruncateSync(fd: number, len?: number | null): void;
//     truncate(path: fs.PathLike, len: number | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     truncate(path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     truncateSync(path: fs.PathLike, len?: number | null): void;
//     copyFileSync(src: fs.PathLike, dest: fs.PathLike, flags?: number): void;
//     copyFile(src: fs.PathLike, dest: fs.PathLike, flags: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     copyFile(src: fs.PathLike, dest: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     fdatasyncSync(fd: number): void;
//     fdatasync(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     createWriteStream(path: fs.PathLike, options?: string | {
//         flags?: string;
//         encoding?: string;
//         fd?: number;
//         mode?: number;
//         autoClose?: boolean;
//         start?: number;
//     }): fs.WriteStream;
//     symlink(target: fs.PathLike, path: fs.PathLike, type: string | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     symlink(target: fs.PathLike, path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     symlinkSync(target: fs.PathLike, path: fs.PathLike, type?: string | null): void;
//     readlink(path: fs.PathLike, callback: (err: NodeJS.ErrnoException, linkString: string) => void): void;
//     readlink(path: fs.PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException, linkString: string) => void): void;
//     readlink(path: fs.PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: NodeJS.ErrnoException, linkString: string | Buffer) => void): void;
//     readlink(path: fs.PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: NodeJS.ErrnoException, linkString: Buffer) => void): void;
//     readlinkSync(path: fs.PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;
//     readlinkSync(path: fs.PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;
//     readlinkSync(path: fs.PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;
//     realpath(path: fs.PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => void): void;
//     realpath(path: fs.PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: NodeJS.ErrnoException, resolvedPath: Buffer) => void): void;
//     realpath(path: fs.PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: NodeJS.ErrnoException, resolvedPath: string | Buffer) => void): void;
//     realpath(path: fs.PathLike, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => void): void;
//     realpathSync(path: fs.PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;
//     realpathSync(path: fs.PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;
//     realpathSync(path: fs.PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;
//     unlink(path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     unlinkSync(path: fs.PathLike): void;
//     rmdir(path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     rmdirSync(path: fs.PathLike): void;
//     mkdir(path: fs.PathLike, mode: number | string | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     mkdir(path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void): void;
//     mkdirSync(path: fs.PathLike, mode?: number | string | null): void;
//     mkdtemp(prefix: string, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException, folder: string) => void): void;
//     mkdtemp(prefix: string, options: "buffer" | { encoding: "buffer" }, callback: (err: NodeJS.ErrnoException, folder: Buffer) => void): void;
//     mkdtemp(prefix: string, options: { encoding?: string | null } | string | undefined | null, callback: (err: NodeJS.ErrnoException, folder: string | Buffer) => void): void;
//     mkdtemp(prefix: string, callback: (err: NodeJS.ErrnoException, folder: string) => void): void;
//     mkdtempSync(prefix: string, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;
//     mkdtempSync(prefix: string, options: { encoding: "buffer" } | "buffer"): Buffer;
//     mkdtempSync(prefix: string, options?: { encoding?: string | null } | string | null): string | Buffer;
//     readdir(path: fs.PathLike, options: { encoding: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
//     readdir(path: fs.PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: NodeJS.ErrnoException, files: Buffer[]) => void): void;
//     readdir(path: fs.PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: NodeJS.ErrnoException, files: (string | Buffer)[]) => void): void;
//     readdir(path: fs.PathLike, callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
//     readdirSync(path: fs.PathLike, options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[];
//     readdirSync(path: fs.PathLike, options: { encoding: "buffer" } | "buffer"): Buffer[];
//     readdirSync(path: fs.PathLike, options?: { encoding?: string | null } | string | null): (string | Buffer)[];
//     close(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     closeSync(fd: number): void;
//     open(path: fs.PathLike, flags: string | number, mode: string | number | undefined | null, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
//     open(path: fs.PathLike, flags: string | number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
//     openSync(path: fs.PathLike, flags: string | number, mode?: string | number | null): number;
//     utimes(path: fs.PathLike, atime: string | number | Date, mtime: string | number | Date, callback: (err: NodeJS.ErrnoException) => void): void;
//     utimesSync(path: fs.PathLike, atime: string | number | Date, mtime: string | number | Date): void;
//     futimes(fd: number, atime: string | number | Date, mtime: string | number | Date, callback: (err: NodeJS.ErrnoException) => void): void;
//     futimesSync(fd: number, atime: string | number | Date, mtime: string | number | Date): void;
//     fsync(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
//     fsyncSync(fd: number): void;
//     write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, position: number | undefined | null, callback: (err: NodeJS.ErrnoException, written: number, buffer: TBuffer) => void): void;
//     write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, callback: (err: NodeJS.ErrnoException, written: number, buffer: TBuffer) => void): void;
//     write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, callback: (err: NodeJS.ErrnoException, written: number, buffer: TBuffer) => void): void;
//     // tslint:disable-next-line:variable-name
//     write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, callback: (err: NodeJS.ErrnoException, written: number, buffer: TBuffer) => void): void;
//     // tslint:disable-next-line:variable-name
//     write(fd: number, string: any, position: number | undefined | null, encoding: string | undefined | null, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
//     // tslint:disable-next-line:variable-name
//     write(fd: number, string: any, position: number | undefined | null, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
//     // tslint:disable-next-line:variable-name
//     write(fd: number, string: any, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
//     // tslint:disable-next-line:variable-name
//     writeSync(fd: number, buffer: Buffer | Uint8Array, offset?: number | null, length?: number | null, position?: number | null): number;
//     // tslint:disable-next-line:variable-name
//     writeSync(fd: number, string: any, position?: number | null, encoding?: string | null): number;
//     read<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number, length: number, position: number | null, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: TBuffer) => void): void;
//     readSync(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number | null): number;
//     readFile(path: fs.PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
//     readFile(path: fs.PathLike | number, options: { encoding: string; flag?: string; } | string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
//     readFile(path: fs.PathLike | number, options: { encoding?: string | null; flag?: string; } | string | undefined | null, callback: (err: NodeJS.ErrnoException, data: string | Buffer) => void): void;
//     readFile(path: fs.PathLike | number, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
//     readFileSync(path: fs.PathLike | number, options?: { encoding?: null; flag?: string; } | null): Buffer;
//     readFileSync(path: fs.PathLike | number, options: { encoding: string; flag?: string; } | string): string;
//     readFileSync(path: fs.PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): string | Buffer;
//     writeFile(path: fs.PathLike | number, data: any, options: { encoding?: string | null; mode?: number | string; flag?: string; } | string | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     writeFile(path: fs.PathLike | number, data: any, callback: (err: NodeJS.ErrnoException) => void): void;
//     writeFileSync(path: fs.PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;
//     appendFile(file: fs.PathLike | number, data: any, options: { encoding?: string | null, mode?: string | number, flag?: string } | string | undefined | null, callback: (err: NodeJS.ErrnoException) => void): void;
//     appendFile(file: fs.PathLike | number, data: any, callback: (err: NodeJS.ErrnoException) => void): void;
//     appendFileSync(file: fs.PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;
//     watchFile(filename: fs.PathLike, options: { persistent?: boolean; interval?: number; } | undefined, listener: (curr: fs.Stats, prev: fs.Stats) => void): void;
//     watchFile(filename: fs.PathLike, listener: (curr: fs.Stats, prev: fs.Stats) => void): void;
//     unwatchFile(filename: fs.PathLike, listener?: (curr: fs.Stats, prev: fs.Stats) => void): void;
// }