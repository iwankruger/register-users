import { Router, NextFunction, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.send('hello users');
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {

    const { name, surname, email } = req.body;
    console.log('body ', name);
    return res.send({ result: true });
});

export = router;
