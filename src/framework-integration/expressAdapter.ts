import { Request, Response, NextFunction } from 'express';
import { Router } from '../router/Router';
import { Middleware } from '../middleware/Middleware';

export const expressAdapter = (router: Router) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const route = router.matchUrl(req.path);
        if (route) {
            const middlewareFunctions = route.getMiddlewares().map((middleware: Middleware) => middleware.getFunction());
            const handler = route.getHandler();
            // Run all middleware functions and the handler function in sequence
            [...middlewareFunctions, handler]
                .reduce((prev, curr) => prev.then(() => curr(req, res, next)), Promise.resolve());
        } else {
            next();
        }
    };
};
