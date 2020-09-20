import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler, NextFunction, Request, Response } from 'express';

function bodyValidators(keys: string): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('validate');
        if(!req.body) {
            return res.status(422).send('Invalid request');
        }
        for(const key of keys) {
            if(!req.body[key]) return res.status(422).send('Invalid request');
        }
        next();
    }
}


export function controller(routePrefix: string): any {
    return (target: () => void) => {
        const router = AppRouter.getInstance();
        console.log('controller ');
        for (const key of Object.keys(target.prototype)) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

            const validator = bodyValidators(requiredBodyProps);

            if (path) router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
        }
    };
}