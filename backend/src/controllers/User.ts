import { Router, NextFunction, Request, Response } from 'express';
import { get, post, patch, del, controller, use, bodyValidator, isString, isRequired, isEmail } from './decorators';


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
    getUsers(req: Request, res: Response, next: NextFunction): any {
        console.log('in function');
        return res.send('users get all');
    }

    @post('/users')
    @bodyValidator({name: [isRequired, isString], surname: [isRequired, isString], email: [isRequired, isEmail]})
    postUser(req: Request, res: Response, next: NextFunction): any {
        return res.send('users add');
    }

    @get('/users/:id')
    getUser(req: Request, res: Response, next: NextFunction): any {
        return res.send('user get');
    }

    @patch('/users/:id')
    patchUser(req: Request, res: Response, next: NextFunction): any {
        return res.send('user update');
    }

    @del('/users/:id')
    deleteUser(req: Request, res: Response, next: NextFunction): any {
        return res.send('user delete');
    }

}
