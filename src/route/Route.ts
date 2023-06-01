import { Middleware } from '../middleware/Middleware';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


export interface RouteParameters {
    [key: string]: string;
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export class Route {
    private name: string;
    private pattern: string;
    private handler: RouteHandler;
    private middlewares: Middleware[];
    private validationSchema?: Joi.Schema;
    private parent?: Route; // Added

    constructor(name: string, pattern: string, handler: RouteHandler, middlewares: Middleware[] = [], validationSchema?: Joi.Schema, parent?: Route) {
        this.name = name;
        this.pattern = pattern;
        this.handler = handler;
        this.middlewares = middlewares;
        this.validationSchema = validationSchema;
        this.parent = parent; // Added
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

    getParent(): Route | undefined {
        return this.parent;
    }

    getFullPath(): string {
        if (this.parent) {
            return this.parent.getFullPath() + this.pattern;
        } else {
            return this.pattern;
        }
    }

    validateParameters(params: RouteParameters): void {
        if (this.validationSchema) {
            const { error } = this.validationSchema.validate(params);
            if (error) {
                throw new Error(`Route parameter validation error: ${error.message}`);
            }
        }
    }
}
