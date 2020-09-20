import { Router, NextFunction, Request, Response } from 'express';
import { get, post, controller, use, bodyValidator, BodyValidatorFunction } from './decorators';


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

const validateString: BodyValidatorFunction = (value) => {
    if (!value) return { result: true, message: null };
    if (typeof value === 'string') return { result: true, message: null };
    return { result: false, message: 'type string required' };
}

const required: BodyValidatorFunction = (value) => {
    if (value) return { result: true, message: null };
    return { result: false, message: 'required' };
}

const isEmail: BodyValidatorFunction = (value) => {
    if (!value) return { result: true, message: null };
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value))) return { result: true, message: null };
    return { result: false, message: 'invalid email address' };
}

@controller('/api')
class User {

    @get('/users')
    @use(logger)
    getLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users get');
    }

    @post('/users')
    @bodyValidator({name: [required, validateString], surname: [required, validateString], email: [required, isEmail]})
    @use(logger)
    //@use(validateUserPost('name','surname', 'email'))
    postLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users post');
    }

}
