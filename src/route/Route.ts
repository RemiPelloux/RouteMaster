import { Middleware } from '../middleware/Middleware';
import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

export interface RouteParameters {
    [key: string]: string;
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export class Route {
    private name: string;
    private pattern: string;
    private handler: RouteHandler;
    private middlewares: Middleware[];
    private validationSchema?: Schema;  // new

    constructor(name: string, pattern: string, handler: RouteHandler, middlewares: Middleware[] = [], validationSchema?: Schema) {
        this.name = name;
        this.pattern = pattern;
        this.handler = handler;
        this.middlewares = middlewares;
        this.validationSchema = validationSchema;  // new
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

    // new
    getValidationSchema(): Schema | undefined {
        return this.validationSchema;
    }

    // new
    validateParameters(params: RouteParameters): void {
        if (this.validationSchema) {
            const { error } = this.validationSchema.validate(params);
            if (error) {
                throw error;
            }
        }
    }
}
