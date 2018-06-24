namespace TsAsync {
    // tslint:disable-next-line:variable-name
    export const Parser = {
        toBuffer,
        fromBuffer
    };
    function fromBuffer(buffer: Buffer, cb: (id: string, args: string[]) => void): void {
        let index = 0;
        while (index < buffer.length) {
            const id = String.fromCharCode(buffer[index]);
            index++; // skip |
            const amount = readNumber();
            const args = [] as string[];
            for (let i = 0; i < amount; i++) {
                const length = readNumber();
                args.push(buffer.utf8Slice(index, index += length));
            }
            cb(id, args);
        }
        function readNumber() {
            let collected = "";
            for (let found; !found; index++) {
                const cur = buffer.utf8Slice(index, index + 1);
                if (cur === "|") {
                    found = true;
                }
                else {
                    collected += cur;
                }
            }
            return +collected;
        }
    }

    function toBuffer(id: string | number, ...args: string[]): Buffer;
    function toBuffer(id: string): Buffer {
        const buf = [id, arguments.length - 1];
        for (let ii = 1; ii < arguments.length; ii++) {
            const cur = arguments[ii] as string;
            buf.push(cur.length, cur);
        }
        return Buffer.from(buf.join("|"), "utf8") as Buffer;
    }
}