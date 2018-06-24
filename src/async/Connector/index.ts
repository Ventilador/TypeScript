namespace TsAsync {
    export function Connector(inStream: Readable, outStream: Writable): MessageConnector {
        let listening = false, draining = false;
        const chunks = new Queue<Buffer>();
        return {
            onData,
            sendData
        };

        function onData(cbToCall: (val: Buffer) => void) {
            if (listening) {
                throw new Error("Cannot listen twice");
            }
            listening = true;
            inStream.addListener("readable", readStream);
            return () => {
                inStream.removeListener("readable", readStream);
                listening = false;
            };
            function readStream(this: Readable) {
                cbToCall(this.read());
            }
        }

        function sendData(buf: Buffer) {
            if (draining) {
                chunks.put(buf);
                return;
            }
            if (!outStream.write(buf)) {
                draining = true;
                outStream.once("drain", flush);
                return;
            }
            draining = false;
        }
        function flush() {
            draining = false;
            // !draining && !chunks.empty()
            while (!(draining || chunks.empty())) {
                sendData(chunks.take());
            }
        }
    }
}