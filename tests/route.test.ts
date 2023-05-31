import { Route, RouteHandler } from '../src/route/Route';

describe('Route', () => {
    test('should create a route with the correct name', () => {
        const handler: RouteHandler = (req, res, next) => {};
        const route = new Route('home', '/', handler);
        expect(route.getName()).toBe('home');
    });

    test('should execute handler correctly', () => {
        const mockReq = {
            // Add more properties as needed for your tests
        } as any;

        const mockRes = {
            // Add more properties as needed for your tests
        } as any;

        const mockNext = jest.fn();

        const handler: RouteHandler = (req, res, next) => {
            expect(req).toBe(mockReq);
            expect(res).toBe(mockRes);
            next();
        };

        const route = new Route('home', '/', handler);
        route.getHandler()(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
    });

    // Add more tests here
});
