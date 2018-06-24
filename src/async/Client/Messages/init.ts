namespace TsAsync.Client {
    export function InitDecorator(context: ClientHandler) {
        context.once("init", function (this: ClientHandler, tsconfigPath: string, tsPath: string, supportedMethods: string[]) {
            this.connector.sendData(Parser.toBuffer(Event.Init, tsconfigPath, tsPath, JSON.stringify(supportedMethods)));
        });
    }
}