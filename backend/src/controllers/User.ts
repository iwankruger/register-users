import { Router, NextFunction, Request, Response } from 'express';
import { get, controller } from './decorators';

// interface RequestWithBody extends Request {
//     body: { [key: string]: string | undefined };
// }

// const router = Router();

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     return res.send('hello users');
// });

// router.post('/', (req: RequestWithBody, res: Response, next: NextFunction) => {

//     const { name, surname, email } = req.body;
//     if (name) {
//         console.log('body ', name.toUpperCase());
//     }
//     return res.send({ result: true });
// });

// export = router;
@controller('/api/v1')
class User {

    @get('/users')
    getLogin(req: Request, res: Response, next: NextFunction): any {
        return res.send('hello users');
    }

}

//export User;

