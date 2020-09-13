import { UsersFetchInterface, ActionTypes, Action } from '../actions';

const INITIAL_STATE: UsersFetchInterface  = {
    users: [], 
    totalCount: 0, 
    limit: 5, 
    offset: 0 
}

export const usersReducer = (state: UsersFetchInterface = INITIAL_STATE, action: Action) => {
    console.log('REDUCER USER');
    switch (action.type) {
        case ActionTypes.usersFetch:
            console.log('PAYLOAD FETCH  ', action.payload);
            return action.payload;
        default:
      return state;
  }

};