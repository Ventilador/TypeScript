import { IRequestContext } from "../../definitions";
import { Waterfall } from "../Waterfall";

export function UpdateHostFile() {
    return function UpdateHostFile(this: Waterfall<IRequestContext>, request: IRequestContext) {
        // this.host.writeFile(request.fileName, request.data);
        this.next(undefined, request);
    };
}
