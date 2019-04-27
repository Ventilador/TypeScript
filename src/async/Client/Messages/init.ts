import { ClientHandler } from "./../";
import { Event } from "../../definitions";
import { Parser } from "../../utils/BufferConnector";

export function InitDecorator(context: ClientHandler) {
    context.once("init", function (this: ClientHandler, tsconfigPath: string, tsPath: string, supportedMethods: string[]) {
        this.connector.sendData(Parser.toBuffer(Event.Init, tsconfigPath, tsPath, JSON.stringify(supportedMethods)));
    });
}
