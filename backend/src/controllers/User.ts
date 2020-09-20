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

@controller('/api')
class User {

    @get('/users')
    @use(logger)
    getLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users get');
    }

    @post('/users')
    //@bodyValidator('name','surname', 'email')
    @use(logger)
    @use(validateUserPost('name','surname', 'email'))
    postLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users post');
    }

}
