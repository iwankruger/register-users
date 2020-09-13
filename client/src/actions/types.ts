import { DummyDataFetchAction, DummyDataDeleteAction } from './dummy';

export enum ActionTypes {
    dummyAction,
    dummyDelete
}

export type Action = DummyDataFetchAction | DummyDataDeleteAction;