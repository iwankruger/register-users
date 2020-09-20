import 'reflect-metadata';

export function get(path: string): any {
    return (target: any, key: string, desc: PropertyDecorator) => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAa ');
        Reflect.defineMetadata('path', path, target, key);
    };
}