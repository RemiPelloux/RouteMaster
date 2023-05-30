import { Route, RouteParameters } from '../route/Route';
import { Middleware } from '../middleware/Middleware';

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

}
