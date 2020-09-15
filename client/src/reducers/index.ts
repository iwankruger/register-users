import { combineReducers } from 'redux';
import { reducer as formReducer, InjectedFormProps } from 'redux-form';
import { dummyReducer } from './dummyReducer';
import { usersReducer, UsersStateInterface } from './usersReducer';
import { DummyData } from '../actions';

export interface StoreState {
    dummy: DummyData[];
    userData: UsersStateInterface;
    form: any;
}

export default combineReducers<StoreState>({ 
    dummy: dummyReducer,
    userData: usersReducer,
    form: formReducer 
});
