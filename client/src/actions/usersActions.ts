import { Dispatch } from 'redux';
import { ActionTypes } from './types'

const users = [{
    id: 0,
    name: 'Ricky',
    surname: 'Ponting',
    email: 'ricky@ponting.com'
},{
    id: 1,
    name: 'AB',
    surname: 'De Villiers',
    email: 'ab@devilliers.com'
},{
    id: 2,
    name: 'Jacques',
    surname: 'Kallis',
    email: 'jacques@kallis.com'
},{
    id: 3,
    name: 'Sachin',
    surname: 'Tendulkar',
    email: 'sachin@tendulkar.com'
},{
    id: 4,
    name: 'Brian',
    surname: 'Lara',
    email: 'brian@lara.com'
},{
    id: 5,
    name: 'Virat',
    surname: 'Kohli',
    email: 'virat@kohli.com'
},{
    id: 6,
    name: 'Adam',
    surname: 'Gilchrist',
    email: 'adam@gilchrist.com'
},{
    id: 7,
    name: 'Shane',
    surname: 'Warne',
    email: 'shane@warne.com'
},{
    id: 8,
    name: 'Brett',
    surname: 'Lee',
    email: 'brett@lee.com'
},{
    id: 9,
    name: 'Dale',
    surname: 'Steyn',
    email: 'dale@steyn.com'
},{
    id: 10,
    name: 'Glenn',
    surname: 'McGrath',
    email: 'glenn@mcgrath.com'
}];

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

    const end = offsetNew + limitNew; //users.length;
    const data = users.slice(offset, end);

    console.log({ users: data, totalCount: users.length, limit: limitNew, offset: offsetNew });
    return (dispatch: Dispatch) => {

        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: { users: data, totalCount: users.length, limit: limitNew, offset: offsetNew } 
        });
    };
};

export const fetchUserDetail = (id: number) => {
    console.log('fetch user detail action');
    
    const data = users[id];
    
    return (dispatch: Dispatch) => {

        dispatch<FetchUserDetailInterface>({ 
            type: ActionTypes.userDetailFetch, 
            payload: data
        });
    };
};

export const addOrUpdateUser = (user: UsersInterface, callback: () => void) => {
    console.log('add or update user action');
    
    let userUpdated = false;
    for(let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
            console.log('found user');
            userUpdated = true;
            users[i] = user; 
        }
    }
    
    const nextId = users.length;

    // if user could not be found add user
    if (!userUpdated) users.push({...user, id: nextId});
    
    const data = users;

    console.log(users);
    

    callback();

    return (dispatch: Dispatch) => {

        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: { users: data, totalCount: users.length, limit: 5, offset: 0 } 
        });
    };
};

export const deleteUser = (id: number, limit: number, offset: number) => {
    console.log('delete user action');
    
    for(let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            console.log('found user');
            users.splice(i, 1);
        }
    }

    console.log(users);

    return fetchUsers(limit, offset);
};
