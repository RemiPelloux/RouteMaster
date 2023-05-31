// tests/url-generator.test.ts

import { URLGenerator } from '../src/url-generator/URLGenerator';
import { Router } from '../src/router/Router';
import { Route } from '../src/route/Route';

describe('URLGenerator', () => {
    const route1 = new Route('home', '/', (req, res, next) => {});
    const route2 = new Route('user', '/user/:id', (req, res, next) => {});
    const router = new Router();
    router.addRoute(route1);
    router.addRoute(route2);
    const urlGenerator = new URLGenerator(router);


    test('should generate URLs for named routes', () => {
        expect(urlGenerator.generate('home', {})).toBe('/');
        expect(urlGenerator.generate('user', { id: '123' })).toBe('/user/123');
    });

    test('should return null for unknown routes', () => {
        expect(urlGenerator.generate('unknown', {})).toBeNull();
    });

});
