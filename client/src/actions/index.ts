import { Dispatch } from 'redux';
import { ActionTypes } from './types'

export interface DummyData {
    id: number;
    title: string;
    active: boolean;
}

export interface DummyDataFetchAction {
    type: ActionTypes.dummyAction;
    payload: DummyData[];
}

export const dummyAction = () => {
    console.log('dummy action');
    const data = [{
        id: 1,
        title: 'Hello world!!!',
        active: true
    },{
        id: 2,
        title: 'Hello back at you!!!',
        active: true
    }];

    return (dispatch: Dispatch) => {

        dispatch<DummyDataFetchAction>({ 
            type: ActionTypes.dummyAction, 
            payload: data 
        });
    };
};