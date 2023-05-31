// tests/framework-integration.test.ts
import httpMocks from 'node-mocks-http';
import { Router } from '../src/router/Router';
import { Route } from '../src/route/Route';
import { expressAdapter } from '../src/framework-integration/expressAdapter';

const router = new Router();
router.addRoute(new Route('home', '/', (req, res, next) => {})); // Add a route that matches the URL '/'
const expressMiddleware = expressAdapter(router);

test('should match URLs to the correct routes', () => {
    const mockReq = httpMocks.createRequest({
        method: 'GET',
        url: '/'
    });
    const mockRes = httpMocks.createResponse();
    const mockNext = jest.fn();

    expressMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).not.toBeCalled();
});

test('should call next middleware for unknown URLs', () => {
    const mockReq = httpMocks.createRequest({
        method: 'GET',
        url: '/unknown'
    });
    const mockRes = httpMocks.createResponse();
    const mockNext = jest.fn();

    expressMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
});
