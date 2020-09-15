import { combineReducers } from 'redux';
import { reducer as formReducer, InjectedFormProps } from 'redux-form';
import { dummyReducer } from './dummyReducer';
import { usersReducer } from './usersReducer';
import { DummyData, UsersFetchInterface } from '../actions';

export interface StoreState {
    dummy: DummyData[];
    userData: UsersFetchInterface;
    form: any;

}

// { users: UsersInterface[], totalCount: number, limit?: number, offset?: number }

export default combineReducers<StoreState>({ 
    dummy: dummyReducer,
    userData: usersReducer,
    form: formReducer  
});
