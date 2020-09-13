import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { StoreState } from '../reducers';
import { UsersInterface, fetchUsers } from '../actions';
import ReactPaginate from 'react-paginate';


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

    handlePageClick = (selectedItem: { selected: number }): void => {
        console.log(selectedItem.selected);

        this.props.fetchUsers(1,2);

    }

    render() {
        
        return (
            <div>
                <ul className="list-group">{this.renderUsers()}</ul>
                <div className="text-xs-right">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={10}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
            );
    }
}


const mapStateToProps = (state: StoreState): { users: UsersInterface[] } => {
    return { users: state.users  };
  };

export default connect(mapStateToProps, { fetchUsers })(UsersShow);
