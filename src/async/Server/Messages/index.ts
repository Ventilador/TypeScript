namespace TsAsync.Server {
    export function ServerMessageManager(instance: HandlerClass) {
        const messages = [
            ProcessFileDecorator
        ].reduce((prev: any, decorator: Function) => {
            return decorator(prev);
        }, new EmptyObject());
        return send;
        function send(id: string, args: string[]) {
            messages[id].apply(instance, args);
        }
    }
}