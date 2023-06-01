// tests/router.test.ts

import { Router } from '../src/router/Router';
import { Route } from '../src/route/Route';

describe('Router', () => {
    const route1 = new Route('home', '/', (req, res, next) => {});
    const route2 = new Route('user', '/user/:id', (req, res, next) => {});
    const router = new Router();
    router.addRoute(route1);
    router.addRoute(route2);

    test('should match URLs to the correct routes', () => {
        expect(router.matchUrl('/')).toBe(route1);
        expect(router.matchUrl('/user/123')).toBe(route2);
    });

    test('should return null for unknown URLs', () => {
        expect(router.matchUrl('/unknown')).toBeNull();
    });
});