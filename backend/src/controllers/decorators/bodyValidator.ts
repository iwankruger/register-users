import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';


export function bodyValidator(...keys: string[]): any {
    return (target: any, key: string, desc: PropertyDecorator) => {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    };
}