# Route Enhancer

A powerful routing library for TypeScript, designed to make your life easier when dealing with routing in your application. Define named routes, generate URLs, match URLs to routes, add middleware, and more, all with strong TypeScript support.

Route Enhancer is framework-agnostic and comes with adapters for popular Node.js frameworks like Express.js, Koa.js, and Hapi.js.

## Features

- **Named routes**: Define names for your routes, much like you can with Symfony's routing system.
- **URL generation**: Generate a URL for a named route, optionally with parameters. This includes routes with optional parameters.
- **Route matching**: Match a given URL to a route, extracting parameters in the process.
- **Middleware support**: Attach middleware to routes, which get run before the route's main handler.
- **Framework integration**: Use the provided adapters to easily integrate Route Enhancer with your server application.
- **Strong TypeScript support**: Take advantage of TypeScript's static type checking to catch errors early and make your code easier to understand and refactor.

## Installation

To install Route Enhancer, use the following command:

```bash
npm install route-enhancer
```

Usage
-----

For a quick start, see the guide below.

```

import { Route, Router, URLGenerator, Middleware } from 'route-enhancer';

// Create a new Router instance
const router = new Router();

// Add a route to the router
router.addRoute(new Route('home', '/', (req, res, next) => {
    // Handler function for the "home" route
}));

// Add a route with middleware
const authMiddleware = new Middleware((req, res, next) => {
    // Authentication middleware
});
router.addRoute(new Route('dashboard', '/dashboard', (req, res, next) => {
    // Handler function for the "dashboard" route
}).addMiddleware(authMiddleware));

// Generate a URL for a named route
const urlGenerator = new URLGenerator(router);
const dashboardUrl = urlGenerator.generate('dashboard'); // Returns "/dashboard"

```
Framework Integration
---------------------

To use Route Enhancer with Express.js, import the Express.js adapter and add it as middleware to your Express.js application:

```
import express from 'express';
import { expressAdapter } from 'route-enhancer/framework-integration/expressAdapter';

const app = express();

// Use the Express.js adapter
app.use(expressAdapter(router));

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
```

License
MIT

