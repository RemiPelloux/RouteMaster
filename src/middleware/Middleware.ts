export type MiddlewareFunction = (req: any, res: any, next: () => void) => void;

export class Middleware {
    private _function: MiddlewareFunction;

    constructor(func: MiddlewareFunction) {
        this._function = func;
    }

    getFunction(): MiddlewareFunction {
        return this._function;
    }
}
