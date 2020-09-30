import { Dispatch } from 'redux';
import { ApiInstance } from '../services/ApiInstance';
import { ActionTypes } from './types';
import config from '../config.json';


export interface UsersInterface {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export interface UsersFetchInterface {
    users: UsersInterface[];
    totalCount: number;
    limit: number; 
    offset: number;
}

export interface FetchUsersInterface {
    type: ActionTypes.usersFetch;
    payload: UsersFetchInterface;
}

export interface FetchUserDetailInterface {
    type: ActionTypes.userDetailFetch;
    payload: UsersInterface;
}

export const fetchUsers = (limit?: number, offset?: number) => {
    console.log('fetch users action');
    
    const limitNew = !limit? 5: limit; 
    const offsetNew = !offset? 0: offset; 

    return async (dispatch: Dispatch) => {
        const userData = await ApiInstance.getInstance().get<UsersFetchInterface>(`${config.server.API}/api/users?limit=${limitNew}&offset=${offsetNew}`);
        //todo if (authResult.status === 200 && authResult.data && authResult.data.token) {
        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: { users: userData.data.users, totalCount: userData.data.totalCount, limit: userData.data.limit, offset: userData.data.offset } 
        });
    
    };
};

export const fetchUserDetail = (id: number) => {
    console.log('fetch user detail action');
    
    return async (dispatch: Dispatch) => {
        const userData = await ApiInstance.getInstance().get<UsersFetchInterface>(`${config.server.API}/api/users/${id}`);
        
        dispatch<FetchUserDetailInterface>({ 
            type: ActionTypes.userDetailFetch, 
            payload: userData.data.users[0]
        });
    };
};

export const fetchUserDetailBlank = () => {
    console.log('fetch user detail action');
    
    const data: UsersInterface = {
        id: -1,
        name: '',
        surname: '',
        email: ''
    };
    
    return (dispatch: Dispatch) => {

        dispatch<FetchUserDetailInterface>({ 
            type: ActionTypes.userDetailFetch, 
            payload: data
        });
    };
};

export const addOrUpdateUser = (user: UsersInterface, callback: () => void) => {
    console.log('add or update user action ', user.id);
    
    return async (dispatch: Dispatch) => {

        if (user.id > 0) {
            // update user
            const userUpdateResult = await ApiInstance.getInstance().patch<UsersFetchInterface>(`${config.server.API}/api/users/${user.id}`, {
                name: user.name,
                surname: user.surname,
                email: user.email
            });
    
        } else {
            // add user
            const userAddResult = await ApiInstance.getInstance().post<UsersFetchInterface>(`${config.server.API}/api/users`, {
                name: user.name,
                surname: user.surname,
                email: user.email
            });    
        }

        const userData = await ApiInstance.getInstance().get<UsersFetchInterface>(`${config.server.API}/api/users`);
        callback();
        

        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: { users: userData.data.users, totalCount: userData.data.totalCount, limit: 5, offset: 0 } 
        });
    };
};

export const deleteUser = (id: number, limit: number, offset: number) => {
    console.log('delete user action');
    
    return async (dispatch: Dispatch) => {
        await ApiInstance.getInstance().delete<boolean>(`${config.server.API}/api/users/${id}`);

        const limitNew = !limit? 5: limit; 
        const offsetNew = !offset? 0: offset; 
      
        const userData = await ApiInstance.getInstance().get<UsersFetchInterface>(`${config.server.API}/api/users?limit=${limitNew}&offset=${offsetNew}`);
        
        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: { users: userData.data.users, totalCount: userData.data.totalCount, limit: userData.data.limit, offset: userData.data.offset } 
        });
        
    
    }
};
