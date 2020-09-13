import { combineReducers } from 'redux';
import { dummyReducer } from './dummyReducer';
import { usersReducer } from './usersReducer';
import { DummyData, UsersInterface } from '../actions';

export interface StoreState {
    dummy: DummyData[],
    users: UsersInterface[]
}

export default combineReducers<StoreState>({ 
    dummy: dummyReducer,
    users: usersReducer  
});
