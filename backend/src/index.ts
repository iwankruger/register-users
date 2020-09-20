import * as bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

import user from './controllers/user';

app.get('/', (eq: Request, res: Response) => {
    res.send(`<div>hell world!!!</div>`)
});

app.use('/api/users', user);

app.listen(5000, () => console.log(`Version 1.0.1 App listening on localhost:5000`));
