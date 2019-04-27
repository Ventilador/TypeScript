import { ClientHandler } from "..";
import { Event } from "../../definitions";
import { Parser } from "../../utils/BufferConnector";

export function ProcessFileDecorator(context: ClientHandler) {
    context.on("processFile", function (this: ClientHandler, fileName: string, content: string) {
        this.connector.sendData(Parser.toBuffer(Event.ProcessFile, fileName, content));
    });
}
