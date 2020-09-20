import { Router, NextFunction, Request, Response } from 'express';
import { get, post, controller, use, bodyValidator } from './decorators';


function logger(req: Request, res: Response, next: NextFunction) {
    console.log('logging hello world!!!');
    next();
}

function validateUserPost(...keys: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('Validate body');
        if (!req.body) {
            return res.status(422).send('Invalid request');
        }
        for (const key of keys) {
            console.log(key)
            if (!req.body[key]) return res.status(422).send('Invalid request');
        }
        next();
    }
}

function validateString(value: any): { result: boolean, message: string | null } {
    if (!value) return { result: true, message: null };
    if (typeof value === 'string') return { result: true, message: null };
    return { result: false, message: 'type string required' };
}

function required(value: any): { result: boolean, message: string | null } {
    if (value) return { result: true, message: null };
    return { result: false, message: 'required' };
}

@controller('/api')
class User {

    @get('/users')
    @use(logger)
    getLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users get');
    }

    @post('/users')
    @bodyValidator({name: [validateString], surname: [required, validateString], email: [required, validateString]})
    @use(logger)
    //@use(validateUserPost('name','surname', 'email'))
    postLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users post');
    }

}
