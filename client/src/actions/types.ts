import { DummyDataFetchAction, DummyDataDeleteAction } from './dummy';
import { FetchUsersInterface, FetchUserDetailInterface, userErrorInterface } from './usersActions';

export enum ActionTypes {
    dummyAction,
    dummyDelete,
    usersFetch,
    userDetailFetch,
    userEditAddError
}

export type Action = DummyDataFetchAction | DummyDataDeleteAction | 
    FetchUsersInterface | FetchUserDetailInterface |
    userErrorInterface;