import { Dispatch } from 'redux';
import { ActionTypes } from './types'

// 1 Ponting
// 2 De Villiers
// 3 Kallis
// 4 Tendulkar
// 5 Lara
// 6 Kholi
// 7 Chilchrist
// 8 Warne
// 9 Steyn
// 10 Lee
// 11 McGrath

export interface UsersInterface {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export interface FetchUsersInterface {
    type: ActionTypes.usersFetch;
    payload: UsersInterface[];
}

export const fetchUsers = (limit?: number, offset?: number) => {
    console.log('fetch users action');
    const users = [{
        id: 1,
        name: 'Ricky',
        surname: 'Ponting',
        email: 'ricky@ponting.com'
    },{
        id: 2,
        name: 'AB',
        surname: 'De Villiers',
        email: 'ab@devilliers.com'
    }];

    return (dispatch: Dispatch) => {

        dispatch<FetchUsersInterface>({ 
            type: ActionTypes.usersFetch, 
            payload: users 
        });
    };
};
