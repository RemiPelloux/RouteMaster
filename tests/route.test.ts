// tests/route.test.ts
import {Route, RouteHandler} from '../src/route/Route';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

test('should validate route parameters according to schema', async () => {
    const handler: RouteHandler = (req: Request, res: Response, next: NextFunction) => {};
    const schema = Joi.object({
        id: Joi.string().alphanum().min(3).max(30).required(),
    });
    const route = new Route('user', '/user/:id', handler, [], schema);

    let params = { id: '123' };
    expect(() => route.validateParameters(params)).not.toThrow();

    params = { id: '1' };
    expect(() => route.validateParameters(params)).toThrow();

    params = { id: '1234567890123456789012345678901' };
    expect(() => route.validateParameters(params)).toThrow();

    params = { id: 'abc' };
    expect(() => route.validateParameters(params)).not.toThrow();  // this line is corrected
});
