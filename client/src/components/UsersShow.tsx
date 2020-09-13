import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

    deleteUser(id: number): void {

    }


    renderUsers(): JSX.Element[] {
        return _.map(this.props.users, users => {
          return (
            <li className="list-group-item" key={users.id}>
              <div className="row">
                    <div className="col-xs-8">
                        <div className="form-inline">
                            {users.name} {users.surname}
                        </div>
                    </div>
                    <div className="col-xs-2">
                        <button onClick={() => this.deleteUser(users.id)} className="btn btn-warning btn-block">Delete</button>
                    </div>
                    <div className="col-xs-2">
                        <Link  to={`/users/${users.id}`} className="btn btn-primary btn-block">View / Edit</Link>  
                    </div>
                </div>
            </li>
          );
        });
      }


    render() {
        
        return (
            <ul className="list-group">{this.renderUsers()}</ul>
            );
    }
}


const mapStateToProps = (state: StoreState): { users: UsersInterface[] } => {
    return { users: state.users  };
  };

export default connect(mapStateToProps, { fetchUsers })(UsersShow);
