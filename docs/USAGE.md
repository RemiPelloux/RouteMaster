Route-Enhancer Usage Guide
==========================

This guide will walk you through how to use the Route-Enhancer library in your TypeScript projects. Route-Enhancer provides a powerful routing and URL generation functionality that can be easily integrated with popular web frameworks like Express.

Installation
------------

First, install the library using npm:



`npm install route-enhancer`

Basic Usage
-----------

Here's a simple example of how you can use Route-Enhancer:

```

import { Route } from 'route-enhancer/src/route/Route';
import { Router } from 'route-enhancer/src/router/Router';
import { URLGenerator } from 'route-enhancer/src/url-generator/URLGenerator';

// Create a router
const router = new Router();

// Add routes
router.addRoute(new Route('home', '/', (req, res, next) => {}));
router.addRoute(new Route('user', '/user/:id', (req, res, next) => {}));

// Create URL generator
const urlGenerator = new URLGenerator(router);

// Generate URLs
console.log(urlGenerator.generate('home')); // Outputs: "/"
console.log(urlGenerator.generate('user', { id: '123' })); // Outputs: "/user/123"
```

Using with Express
------------------

You can easily integrate Route-Enhancer with Express using the provided adapter:


```
import express from 'express';
import { Route } from 'route-enhancer/src/route/Route';
import { Router } from 'route-enhancer/src/router/Router';
import { expressAdapter } from 'route-enhancer/src/framework-integration/express';

const app = express();
const router = new Router();

// Add routes
router.addRoute(new Route('home', '/', (req, res, next) => {
res.send('Home Page');
}));

router.addRoute(new Route('user', '/user/:id', (req, res, next) => {
res.send(`User Page: ${req.params.id}`);
}));

// Use with Express
app.use(expressAdapter(router));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));`
```
In this example, visiting `http://localhost:3000/` will display "Home Page", and `http://localhost:3000/user/123` will display "User Page: 123".

Advanced Usage
--------------

For more advanced usage, such as adding middleware to your routes, please refer to the API documentation.