import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export type BodyValidatorFunction = (value: string) => { result: boolean; message: string | null };

export interface BodyValidatorDecoratorParameters {
    [key: string]: (BodyValidatorFunction)[];
}

export const validateString: BodyValidatorFunction = (value) => {
    if (!value) return { result: true, message: null };
    if (typeof value === 'string') return { result: true, message: null };
    return { result: false, message: 'type string required' };
}

export const required: BodyValidatorFunction = (value) => {
    if (value) return { result: true, message: null };
    return { result: false, message: 'required' };
}

export const isEmail: BodyValidatorFunction = (value) => {
    if (!value) return { result: true, message: null };
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value))) return { result: true, message: null };
    return { result: false, message: 'invalid email address' };
}

export function bodyValidator(keys: BodyValidatorDecoratorParameters ): any {
    return (target: any, key: string, desc: PropertyDecorator) => {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    };
}