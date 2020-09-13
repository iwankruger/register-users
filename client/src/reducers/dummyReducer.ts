import { DummyData, ActionTypes, Action } from '../actions';

export const dummyReducer = (state: DummyData[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.dummyAction:
            return action.payload;
        case ActionTypes.dummyDelete:
            return state.filter((dummy: DummyData) => dummy.id !== action.payload);    
        default:
      return state;
  }

};