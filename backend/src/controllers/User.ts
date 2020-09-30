import { Router, NextFunction, Request, Response } from 'express';
import { get, post, patch, del, controller, use, bodyValidator, isString, isRequired, isEmail } from './decorators';
import * as verify from '../verify';
import { User as UserService } from '../services/User';


// todo add logging
function logger(req: Request, res: Response, next: NextFunction) {
    console.log('logging request todo');
    console.log(req.body);
    next();
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
        if (!req.params || !req.params.id || isNaN(Number(req.params.id))) return res.status(400).send('parameter id of type number missing');

        UserService.get(Number(req.params.id)).then((users) => {
            return res.send(users);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    }

    @patch('/users/:id')
    @use(verify.verifyOrdinaryUserJwt)
    @bodyValidator({name: [isString], surname: [isString], email: [isEmail]})
    patchUser(req: Request, res: Response, next: NextFunction) {
        if (!req.params || !req.params.id || isNaN(Number(req.params.id))) return res.status(400).send('parameter id of type number missing');

        if (!req.body.name && !req.body.surname && !req.body.email) return res.status(400).send('body parameters missing');

        const id = Number(req.params.id);
        UserService.save({ ...req.body, id}).then((result) => {
            return res.send(result);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    }

    @del('/users/:id')
    @use(verify.verifyOrdinaryUserJwt)
    deleteUser(req: Request, res: Response, next: NextFunction) {
        if (!req.params || !req.params.id || isNaN(Number(req.params.id))) return res.status(400).send('parameter id of type number missing');
        UserService.delete(Number(req.params.id)).then((users) => {
            return res.send(users);
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
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
