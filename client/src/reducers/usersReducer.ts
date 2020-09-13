import { UsersInterface, ActionTypes, Action } from '../actions';

export const usersReducer = (state: UsersInterface[] = [], action: Action) => {
    console.log('REDUCER USER');
    switch (action.type) {
        case ActionTypes.usersFetch:
            console.log('PAYLOAD FETCH  ', action.payload);
            return action.payload;
        default:
      return state;
  }

};