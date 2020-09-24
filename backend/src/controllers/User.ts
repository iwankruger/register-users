import { Router, NextFunction, Request, Response } from 'express';
import { get, post, patch, del, controller, use, bodyValidator, isString, isRequired, isEmail } from './decorators';
import * as verify from '../verify';
import { User as UserService } from '../services/user';


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
    getUsers(req: Request, res: Response, next: NextFunction): void {

        // get limit
        let limit: null | number = null;
        if (req.query && req.query.limit && !isNaN(Number(req.query.limit))) {
            limit = Number(req.query.limit);
        }
        // get offset
        let offset: null | number = null;
        if (req.query && req.query.offset && !isNaN(Number(req.query.offset))) {
            offset = Number(req.query.offset);
        }

        UserService.get(null, limit, offset).then((users) => {
            return res.send(users);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    }

    @post('/users')
    @use(verify.verifyOrdinaryUserJwt)
    @bodyValidator({name: [isRequired, isString], surname: [isRequired, isString], email: [isRequired, isEmail]})
    postUser(req: Request, res: Response, next: NextFunction): void {
        UserService.save(req.body).then((result) => {
            return res.send(result);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });

    }

    @get('/users/:id')
    @use(verify.verifyOrdinaryUserJwt)
    getUser(req: Request, res: Response, next: NextFunction) {
        if (!req.params || !req.params.id || isNaN(Number(req.params.id))) return res.status(500).send('parameter id of type number missing');

        UserService.get(Number(req.params.id)).then((users) => {
            return res.send(users);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    }

    @patch('/users/:id')
    @use(verify.verifyOrdinaryUserJwt)
    patchUser(req: Request, res: Response, next: NextFunction): Response<any> {
        return res.send('user update');
    }

    @del('/users/:id')
    @use(verify.verifyOrdinaryUserJwt)
    deleteUser(req: Request, res: Response, next: NextFunction): Response<any> {
        return res.send('user delete');
    }

    @post('/users/login')
    @bodyValidator({username: [isRequired, isString], password: [isRequired, isString]})
    postUserLogin(req: Request, res: Response, next: NextFunction): void {
        verify.getToken(req.body.username, req.body.password).then((token) => {
            return res.send({ token });
        }).catch((error) => {
            return res.status(401).send('Unauthorized');
        });
    }

}
