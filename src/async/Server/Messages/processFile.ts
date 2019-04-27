import { Event } from "./../../definitions";
import { HandlerClass } from "./../index";

export function ProcessFileDecorator(context: any) {
    context[Event.ProcessFile.toString()] = processFile;
}
function processFile(this: HandlerClass, fileName: string, content: string) {
    this.process(fileName, content);
}