import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export type BodyValidatorFunction = (value: string) => { result: boolean; message: string | null };

export interface BodyValidatorDecoratorParameters {
    [key: string]: (BodyValidatorFunction)[];
}

export function bodyValidator(keys: BodyValidatorDecoratorParameters ): any {
    console.log('DEBUG 1 ',keys);
    return (target: any, key: string, desc: PropertyDecorator) => {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    };
}