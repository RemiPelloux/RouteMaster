Route Enhancer
==============

Route Enhancer is a minimalistic routing library for Node.js, designed with simplicity and extensibility in mind.

Features
--------

-   URL pattern matching
-   URL generation for named routes
-   Middleware support
-   Parameter validation
-   Nested routing

Installation
------------

Use the following command to install Route Enhancer:



`npm install route-enhancer`

Usage
-----

### Defining Routes

First, create a `Router` instance:

```
import { Router } from 'route-enhancer';

const router = new Router();
```

Then, add routes using the addRoute method:

```
import { Route } from 'route-enhancer';
import Joi from 'joi';

const handler = (req, res, next) => {
// Handle request here
};

// Define a parameter validation schema
const paramsSchema = Joi.object({
id: Joi.string().alphanum().required(),
});

const route = new Route('user', '/user/:id', handler, [], paramsSchema);

router.addRoute(route);
```

### Nested Routes

To define nested routes, you can pass the parent route as the last parameter to the `Route` constructor. Here is an example:

```
const parentRoute = new Route('user', '/user/:id', handler, [], paramsSchema);
const childRoute = new Route('userProfile', '/profile', handler, [], undefined, parentRoute);

// Add child route to router
router.addRoute(childRoute);

// Now you can match URLs like '/user/123/profile'
```

### Matching URLs to Routes

Use the `matchUrl` method to find the route that matches a given URL:


```
const route = router.matchUrl('/user/123');

if (route) {
// Route was found
}
```

### Generating URLs for Named Routes

Use the `generateUrl` method to generate a URL for a named route:

```
const url = router.generateUrl('user', { id: '123' });

// url is now '/user/123'
```

### Parameter Validation

Routes can be created with a validation schema that defines rules for their parameters. The library uses Joi for parameter validation. When a route is matched, the `validateParameters` method of the `Route` class can be used to validate the parameters against the schema:



```
const paramsSchema = Joi.object({
id: Joi.string().alphanum().required(),
});

const route = new Route('user', '/user/:id', handler, [], paramsSchema);

const params = { id: '123' };

try {
route.validateParameters(params);
} catch (err) {
// Parameter validation failed
}
```

Contributions
-------------

Contributions are welcome! Please submit a pull request or create an issue to propose changes or report bugs.


NEW FEATURES COMING SOON
------------------------

1.  Dynamic Routes: The ability to add routes dynamically at runtime could be a valuable addition to the library.

2.  HTTP Method Support: The library could be extended to support HTTP methods, allowing different handlers for different methods on the same URL pattern.

3.  Wildcard and Regex Support: Extending the URL pattern matching to support wildcards and regular expressions could provide more flexibility in defining route patterns.

4.  Pre and Post Middleware: In addition to the existing middleware support, the library could provide pre and post middleware that run before and after the route handler respectively.

5.  Route Groups: A feature to group routes with a common base URL or set of middleware could simplify route management.

6.  Automatic Documentation: The library could generate API documentation based on the routes, their handlers, and their validation schemas.

7.  Route Aliases: The ability to define aliases for routes would provide additional flexibility for URL generation.

8.  Integration with popular frameworks: The library could provide seamless integration with popular Node.js frameworks like Express, Koa, etc.

9.  Rate Limiting: As a security feature, the library could support rate limiting to prevent abuse.