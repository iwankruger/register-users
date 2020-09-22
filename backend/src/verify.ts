import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';

// todo: store secret key in a secure location
const JWT_SECRET_KEY = '1234-5678-9012';

passport.use(new LocalStrategy ((username: string, password: string, next: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    console.log('debug local strategy ', username);
    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password') {
        return next(null, { name: 'name' });
    }

    return next(null, false);

}));

passport.use(new BasicStrategy((username: string, password: string, next: (error: any, user?: any, options?: IVerifyOptions) => void): void => {
    console.log('debug basic strategy ');
    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password') {
        return next(null, { username: 'admin', password: 'password' });
    }

    return next(null, false);

}));

export let verifyOrdinaryUserLocal = passport.authenticate('local', { session: false });
export let verifyOrdinaryUserBasic = passport.authenticate('basic', { session: false });

export const getToken = (username: string, password: string): Promise<string> => {

    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: 3600 });
        return Promise.resolve(token);
    }

    return Promise.reject(new Error('Unauthorized'));
};

interface RequestWithKey extends Request {
    decoded?: object | undefined
}

export const verifyOrdinaryUserJwt = (req: RequestWithKey, res: Response, next: NextFunction) => {
    console.log('debug jwt strategy ');
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) return res.status(401).send('Unauthorized');

    // decode token
    jwt.verify(token, JWT_SECRET_KEY, (error: jwt.VerifyErrors | null, decoded: object | undefined) => {
        if (error) return res.status(401).send('Unauthorized');

        const key = 'decoded';
        req[key] = decoded;
        return next();
    });

};