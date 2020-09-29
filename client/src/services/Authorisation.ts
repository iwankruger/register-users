import axios from 'axios';
import config from '../config.json';

export class Authorisation {

    static async login(): Promise<string> {
        try {
        const authResult = await axios.post(`${config.server.API}/api/users/login`, {
            username: 'admin', // todo move this to a secure location 
            password: 'password' // todo move this to a secure location
        });
        if (authResult.status === 200 && authResult.data && authResult.data.token) {
            return authResult.data.token;
        }
        return Promise.reject(new Error('Login failed'));
    } catch (error) {
        return Promise.reject(error);
    }
    }
    

}

