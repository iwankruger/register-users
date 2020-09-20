import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
//import User from './controllers/User';
import { AppRouter } from './AppRouter';
import './controllers/User';

const app = express();

app.use(bodyParser.json());

app.get('/', (eq: Request, res: Response) => {
    res.send(`<div>hell world!!!</div>`)
});

//app.use('/api/users', User);
app.use(AppRouter.getInstance());

app.listen(5000, () => console.log(`Version 1.0.1 App listening on localhost:5000`));
