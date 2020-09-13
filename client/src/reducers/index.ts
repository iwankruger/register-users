import { combineReducers } from 'redux';
import { dummyReducer } from './dummyReducer';
import { usersReducer } from './usersReducer';
import { DummyData, UsersFetchInterface } from '../actions';

export interface StoreState {
    dummy: DummyData[],
    userData: UsersFetchInterface
}

// { users: UsersInterface[], totalCount: number, limit?: number, offset?: number }

export default combineReducers<StoreState>({ 
    dummy: dummyReducer,
    userData: usersReducer  
});
