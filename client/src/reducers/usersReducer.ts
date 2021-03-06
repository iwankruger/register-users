import { UsersFetchInterface, UsersInterface, ActionTypes, Action } from '../actions';

export type UsersStateInterface = UsersFetchInterface & { user: UsersInterface } & { error?: string | null };


const INITIAL_STATE: UsersStateInterface  = {
    users: [], 
    totalCount: 0, 
    limit: 5, 
    offset: 0,
    user: {
        id: -1,
        name: '',
        surname: '',
        email: ''
    }
}

export const usersReducer = (state: UsersStateInterface = INITIAL_STATE, action: Action) => {
    console.log('REDUCER USER');
    switch (action.type) {
        case ActionTypes.usersFetch:
            console.log('PAYLOAD FETCH  ', action.payload);
            return { ...state, ...action.payload, error: null };
        case ActionTypes.userDetailFetch:
            console.log('PAYLOAD USER DETAIL  ', action.payload);
            return { ...state, user: action.payload, error: null };
        case ActionTypes.userEditAddError:
            console.log('PAYLOAD ERROR  ', action.payload);
            return { ...state, error: action.payload };
            //return { ...state, hello: action.payload };
        default:
      return state;
  }

};