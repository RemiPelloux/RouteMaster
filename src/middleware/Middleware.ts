import { Request, Response, NextFunction } from 'express';

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export class Middleware {
    private _function: MiddlewareFunction;

    constructor(func: MiddlewareFunction) {
        this._function = func;
    }

    getFunction(): MiddlewareFunction {
        return this._function;
    }
}
