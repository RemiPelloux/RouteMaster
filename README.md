# Route Enhancer

A minimalistic routing library for Node.js, designed with simplicity and extensibility in mind.

## Features

- URL pattern matching
- URL generation for named routes
- Middleware support
- Parameter validation

## Installation

```bash
npm install route-enhancer
```

## Usage

### Defining routes

First, create a `Router` instance:

```typescript
import { Router } from 'route-enhancer';

const router = new Router();
```

Then, add routes using the addRoute method:

```typescript
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


## Matching URLs to routes
### Use the matchUrl method to find the route that matches a given URL:

```typescript
const route = router.matchUrl('/user/123');

if (route) {
    // Route was found
}

```

### Generating URLs for named routes
## Use the generateUrl method to generate a URL for a named route:

```typescript
const url = router.generateUrl('user', { id: '123' });

// url is now '/user/123'
```

## Parameter Validation
Routes can be created with a validation schema that defines rules for their parameters. The library uses Joi for parameter validation. When a route is matched, the validateParameters method of the Route class can be used to validate the parameters against the schema:

```typescript
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

## Contributions
Contributions are welcome! Please submit a pull request or create an issue to propose changes or report bugs.