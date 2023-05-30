import { Middleware } from '../middleware/Middleware';
import { Request, Response, NextFunction } from 'express';

export interface RouteParameters {
    [key: string]: string;
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export class Route {
    private name: string;
    private pattern: string;
    private handler: RouteHandler;
    private middlewares: Middleware[];

    constructor(name: string, pattern: string, handler: RouteHandler, middlewares: Middleware[] = []) {
        this.name = name;
        this.pattern = pattern;
        this.handler = handler;
        this.middlewares = middlewares;
    }

    getName(): string {
        return this.name;
    }

    getPattern(): string {
        return this.pattern;
    }

    getHandler(): RouteHandler {
        return this.handler;
    }

    getMiddlewares(): Middleware[] {
        return this.middlewares;
    }
}

