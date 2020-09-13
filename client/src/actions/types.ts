import { DummyDataFetchAction, DummyDataDeleteAction } from './dummy';
import { FetchUsersInterface } from './usersActions';

export enum ActionTypes {
    dummyAction,
    dummyDelete,
    usersFetch
}

export type Action = DummyDataFetchAction | DummyDataDeleteAction | FetchUsersInterface;