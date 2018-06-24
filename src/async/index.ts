namespace TsAsync {
    /*@internal*/
    export class EmptyObject {
        [key:string]: any; // tslint:disable-line
     }
    /*@internal*/
    export const NULL: any = null; // tslint:disable-line
    EmptyObject.prototype = NULL;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = TsAsync;
    }
}
