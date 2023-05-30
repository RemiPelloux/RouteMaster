import { RouteParameters } from '../route/Route';
import { Router } from '../router/Router';

export class URLGenerator {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    generate(routeName: string, parameters: RouteParameters): string | null {
        return this.router.generateUrl(routeName, parameters);
    }
}