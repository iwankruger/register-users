import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { StoreState } from '../reducers';
import { fetchUsers, deleteUser } from '../actions';
import ReactPaginate from 'react-paginate';
import { UsersStateInterface } from '../reducers/usersReducer';


interface AppProps {
    userData: UsersStateInterface;
    fetchUsers: Function; // bypass redux-thunk returning a function and typescript complaining about type
    deleteUser: Function; // bypass redux-thunk returning a function and typescript complaining about type
}

class UsersShow extends React.Component<AppProps> {

    state = { pageCount: 10, pageSelected: 0 };

    componentDidMount() {
        this.props.fetchUsers();
        const pageCount = Math.ceil(this.props.userData.totalCount / this.props.userData.limit);
        this.setState({ pageCount });
    }

    componentDidUpdate(prevProps: AppProps): void {

        if (prevProps.userData.totalCount !== this.props.userData.totalCount) {
            const pageCount = Math.ceil(this.props.userData.totalCount / this.props.userData.limit);
            this.setState({ pageCount });
        }
    }

    deleteUser(id: number): void {
        const limit = this.props.userData.limit
        const newOffset = (this.state.pageSelected + 1) * limit - limit;
        this.props.deleteUser(id, limit, newOffset);  
    }



    renderUsers(): JSX.Element[] {
        return _.map(this.props.userData.users, users => {
          return (
            <li className="list-group-item" key={users.id}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-inline">
                            {users.name} {users.surname}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button onClick={() => this.deleteUser(users.id)} className="btn btn-danger btn-block">Delete</button>
                    </div>
                    <div className="col-md-2">
                        <Link  to={`/users/${users.id}`} className="btn btn-primary btn-block">View / Edit</Link>  
                    </div>
                </div>
            </li>
          );
        });
    }

    handlePageClick = (selectedPage: { selected: number }): void => {
        this.setState({ pageSelected: selectedPage.selected});
        // calculate offset from page selected
        const limit = this.props.userData.limit
        const newOffset = (selectedPage.selected + 1) * limit - limit;
        this.props.fetchUsers(limit, newOffset);
    }

    renderError() {
        if (this.props.userData.error) {
            return (
                <div>
                    {this.props.userData.error}
                </div>
            );
        }
    }

    render() {
        
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary float-right1" to="/users/new">
                        Add a User
                    </Link>
                </div>
                <div className="pt-3">
                    <ul className="list-group">{this.renderUsers()}</ul>
                </div>
                { this.renderError()}
                <div className="float-right pt-3">
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: StoreState): { userData: UsersStateInterface } => {
    return { userData: state.userData  };
  };

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersShow);
