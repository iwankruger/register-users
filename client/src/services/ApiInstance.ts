import axios, { AxiosInstance } from 'axios';
import { Authorisation } from './Authorisation';

export class ApiInstance {
    private static instance: AxiosInstance;
    private static authToken: string;

    static getInstance(): AxiosInstance {
        if (!ApiInstance.instance) {
            ApiInstance.instance = axios.create();
            ApiInstance.addRequestInterceptor();
            ApiInstance.addResponseInterceptor();
        }

        return ApiInstance.instance;
    }
    
    static setToken(token: string): void {
        ApiInstance.authToken = token;
    }

    static addRequestInterceptor(): void {
        // request interceptor for API calls
        // interceptor adds authentication token to all requests
        ApiInstance.instance.interceptors.request.use(
            async (config: any) => {
                config.headers = { 
                    'token': ApiInstance.authToken
                }
                return config;
            },
            error => {
            Promise.reject(error)
        });
    }

    static addResponseInterceptor(): void {
       
        // response interceptor for API calls
        // if the user is logged out a new authentication token is obtained 
        // and the request is reattempted
        ApiInstance.instance.interceptors.response.use((response) => {
            return response
        }, async (error) => {
            try {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    // authenticate and get login token
                    const token = await Authorisation.login();
                    // set login token
                    ApiInstance.authToken = token;
                    originalRequest._retry = true;
                    return ApiInstance.instance(originalRequest);
                }
                return Promise.reject(error);
            } catch (error) {
                return Promise.reject(error);
            }
        });
    }

}

