import { DummyDataFetchAction, DummyDataDeleteAction } from './dummy';
import { FetchUsersInterface, FetchUserDetailInterface } from './usersActions';

export enum ActionTypes {
    dummyAction,
    dummyDelete,
    usersFetch,
    userDetailFetch
}

export type Action = DummyDataFetchAction | DummyDataDeleteAction | 
    FetchUsersInterface | FetchUserDetailInterface;