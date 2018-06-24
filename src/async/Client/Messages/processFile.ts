namespace TsAsync.Client {
    export function ProcessFileDecorator(context: ClientHandler) {
        context.on("processFile", function (this: ClientHandler, fileName: string, content: string) {
            this.connector.sendData(Parser.toBuffer(Event.ProcessFile, fileName, content));
        });
    }
}