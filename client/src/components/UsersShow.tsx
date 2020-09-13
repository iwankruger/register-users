import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StoreState } from '../reducers';
import { UsersInterface, fetchUsers } from '../actions';


interface AppProps {
    users: UsersInterface[];
    fetchUsers: Function; // bypass redux-thunk returning a function and typescript complaining about type
}

class UsersShow extends React.Component<AppProps> {

    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return _.map(this.props.users, users => {
          return (
            <li key={users.id}>
              {users.name}
            </li>
          );
        });
      }


    render() {
        
        return (
            <ul>{this.renderUsers()}</ul>
            );
    }
}


const mapStateToProps = (state: StoreState): { users: UsersInterface[] } => {
    return { users: state.users  };
  };

export default connect(mapStateToProps, { fetchUsers })(UsersShow);
