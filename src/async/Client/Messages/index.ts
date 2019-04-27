import { ProcessFileDecorator } from "./processFile";
import { InitDecorator } from "./init";
import { EmptyObject } from "../../definitions";
import { ClientHandler } from "./..";

export function ClientMessageManager(instance: ClientHandler) {
    const messages = [
        ProcessFileDecorator,
        InitDecorator
    ].reduce((prev: any, decorator: Function) => {
        return decorator(prev) || prev;
    }, new EmptyObject());
    return apply;
    function apply(id: string, args: string[]) {
        messages[id].apply(instance, args);
    }
}