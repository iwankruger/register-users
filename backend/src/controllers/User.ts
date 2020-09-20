import { Router, NextFunction, Request, Response } from 'express';
import { get, post, controller, use, bodyValidator } from './decorators';


function logger(req: Request, res: Response, next: NextFunction) {
    console.log('logging hello world!!!');
    next();
}

// export = router;
@controller('/api')
class User {

    @get('/users')
    @use(logger)
    getLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users get');
    }

    @post('/users')
    @bodyValidator('name','surname', 'email')
    @use(logger)
    postLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users post');
    }

}
