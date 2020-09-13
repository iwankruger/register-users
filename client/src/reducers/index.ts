import { combineReducers } from 'redux';
import { dummyReducer } from './dummyReducer';
import { DummyData, DummyDataFetchAction } from '../actions';

export interface StoreState {
    dummy: DummyData[]
}

export default combineReducers<StoreState>({ 
    dummy: dummyReducer  
});
