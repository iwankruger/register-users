import { Router, NextFunction, Request, Response } from 'express';
import { get, post, patch, del, controller, use, bodyValidator, isString, isRequired, isEmail } from './decorators';
import * as verify from '../verify';
import { User as UserModel } from '../database/models';


function logger(req: Request, res: Response, next: NextFunction) {
    console.log('logging hello world!!!');
    console.log(req.body);
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
    // basic auth example @use(verify.verifyOrdinaryUserBasic)
    @use(verify.verifyOrdinaryUserJwt)
    @use(logger)
    getUsers(req: Request, res: Response, next: NextFunction): any {
        console.log('in function');
        UserModel.findAll().then((items: UserModel[]) => {
            console.log('find find find find find  ', items);
            console.log('item  ', items[0].getDataValue('id'));
            console.log('item  ', items[0].id);
            console.log('item  ', items[0]);
            return res.send(items);
        }).catch((error: any) => {
            console.log('catch ', error);
        })
        // return res.send('users get all');
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

    @post('/users/login')
    @bodyValidator({username: [isRequired, isString], password: [isRequired, isString]})
    postUserLogin(req: Request, res: Response, next: NextFunction): any {
        verify.getToken(req.body.username, req.body.password).then((token) => {
            return res.send({ token });
        }).catch((error) => {
            return res.status(401).send('Unauthorized');
        });
    }

}
