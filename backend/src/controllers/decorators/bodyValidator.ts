import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';


export function bodyValidator(keys: { [key: string]: ((value: any) => { result: boolean, message: string | null })[] } ): any {
    console.log('DEBUG 1 ',keys);
    return (target: any, key: string, desc: PropertyDecorator) => {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    };
}