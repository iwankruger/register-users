import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';

class ShowUsers extends React.Component {
    render() {
        
        return (
            <div>
               show users here
            </div>);
    }
}


const mapStateToProps = (): { } => {
    return {  };
  };

export default connect(mapStateToProps, null)(ShowUsers);
