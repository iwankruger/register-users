import React from 'react';
import { connect } from 'react-redux';



class UsersAddOrEdit extends React.Component {
  render() {
    return <div>Add or Edit users</div>;
  }
}


const mapStateToProps = () => {
    return { };
  };

export default connect(mapStateToProps, null)(UsersAddOrEdit);
