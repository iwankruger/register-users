import { DummyData, DummyDataFetchAction } from '../actions';
import { ActionTypes } from '../actions/types';

export const dummyReducer = (state: DummyData[] = [], action: DummyDataFetchAction) => {
    switch (action.type) {
        case ActionTypes.dummyAction:
            return action.payload;
        default:
      return state;
  }

};