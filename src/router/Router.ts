import { Route, RouteParameters } from '../route/Route';
import { Middleware } from '../middleware/Middleware';
import Joi from 'joi';

export type RouteHandler = (req: any, res: any, next: () => void) => void;

export class Router {
    private routes: Map<string, Route>;

    constructor() {
        this.routes = new Map();
    }

    addRoute(route: Route): void {
        this.routes.set(route.getName(), route);
    }

    getMiddleware(routeName: string): Middleware[] | undefined {
        const route = this.routes.get(routeName);
        return route ? route.getMiddlewares() : undefined;
    }

    matchUrl(url: string): Route | null {
        for (const route of this.routes.values()) {
            const pattern = new RegExp('^' + route.getPattern().replace(/:\w+/g, '\\w+') + '$');
            if (pattern.test(url)) {
                return route;
            }
        }
        return null;
    }

    generateUrl(name: string, parameters: RouteParameters): string | null {
        const route = this.routes.get(name);
        if (!route) {
            return null;
        }

        let url = route.getPattern();
        for (const [key, value] of Object.entries(parameters)) {
            url = url.replace(`:${key}`, value);
        }
        return url;
    }

    handleRequest(req: any, res: any, next: () => void): void {
        const route = this.matchUrl(req.path);
        if (!route) {
            next();
            return;
        }

        try {
            const params = this.extractParamsFromUrl(route, req.path);
            route.validateParameters(params);  // validate parameters
            const handler = route.getHandler();
            handler(req, res, next);
        } catch (err) {
            next();
        }
    }

    private extractParamsFromUrl(route: Route, url: string): RouteParameters {
        const patternParts = route.getPattern().split('/');
        const urlParts = url.split('/');
        const params: RouteParameters = {};

        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].substring(1);
                params[paramName] = urlParts[i];
            }
        }

        return params;
    }
}
