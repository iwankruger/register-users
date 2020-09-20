import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';

export function controller(routePrefix: string): any {
    return (target: Function) => {
        const router = AppRouter.getInstance();
        console.log('controller ');
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);

            if (path) router[method](`${routePrefix}${path}`, routeHandler);
        }
        
    };
}