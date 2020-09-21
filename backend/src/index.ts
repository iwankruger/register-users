import bodyParser from 'body-parser';
import passport from 'passport';
import express, { NextFunction, Request, Response } from 'express';
import { AppRouter } from './AppRouter';
import './controllers/User';
import * as verify from './verify';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());


app.get('/', verify.verifyOrdinaryUserLocal, (eq: Request, res: Response) => {
    res.send(`<div>hell world!!!</div>`)
});

app.use(AppRouter.getInstance());

app.listen(5000, () => console.log(`Version 1.0.1 App listening on localhost:5000`));
