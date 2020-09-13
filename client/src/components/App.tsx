import React from 'react';
import { connect } from 'react-redux';
import { dummyAction, DummyData } from '../actions';
import { StoreState } from '../reducers';


interface AppProps {
    dummy: DummyData[];
    dummyAction(): any;
}

class _App extends React.Component<AppProps> {


    componentDidMount() {
        console.log('DDDDDDDDDDDd');
        let t = this.props.dummyAction();
        console.log(t);
    }

    renderList(): JSX.Element[] {
        return this.props.dummy.map((dummy: DummyData) => {
          return <div key={dummy.id}>{dummy.title}</div>;
        });
    }

    render() {
        
        return (
            <div>
                <div>Testing...</div>
                {this.renderList()}
            </div>);
    }
}

const mapStateToProps = (state: StoreState): { dummy: DummyData[] } => {
  return { dummy: state.dummy };
};

export const App = connect(mapStateToProps, { dummyAction })(_App);