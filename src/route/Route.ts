import { Middleware } from '../middleware/Middleware';

export interface RouteParameters {
    [key: string]: string;
}

export type RouteHandler = (params: RouteParameters) => void;

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
