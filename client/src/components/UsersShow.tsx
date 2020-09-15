import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { StoreState } from '../reducers';
import { UsersFetchInterface, fetchUsers } from '../actions';
import ReactPaginate from 'react-paginate';


interface AppProps {
    userData: UsersFetchInterface;
    fetchUsers: Function; // bypass redux-thunk returning a function and typescript complaining about type
}

class UsersShow extends React.Component<AppProps> {

    state = { pageCount: 10 };

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

    }


    renderUsers(): JSX.Element[] {
        return _.map(this.props.userData.users, users => {
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

    handlePageClick = (selectedPage: { selected: number }): void => {
        // calculate offset from page selected
        const limit = this.props.userData.limit
        const newOffset = (selectedPage.selected + 1) * limit - limit;
        this.props.fetchUsers(limit, newOffset);
    }

    render() {
        
        return (
            <div>
                <ul className="list-group">{this.renderUsers()}</ul>
                <div className="text-xs-right">
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


const mapStateToProps = (state: StoreState): { userData: UsersFetchInterface } => {
    return { userData: state.userData  };
  };

export default connect(mapStateToProps, { fetchUsers })(UsersShow);
