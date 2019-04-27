import { MessageConnector, Readable, Writable, CustomBuffer } from './../definitions';
import { Queue } from './../utils/Collections';
export function Connector(inStream: Readable, outStream: Writable): MessageConnector {
    let listening = false, draining = false;
    const chunks = new Queue<CustomBuffer>();
    return {
        onData,
        sendData
    };

    function onData(cbToCall: (val: CustomBuffer) => void) {
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

    function sendData(buf: CustomBuffer) {
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