import React from 'react';
import { connect } from 'react-redux';
import { dummyAction, DummyData, dummyDeleteAction } from '../actions';
import { StoreState } from '../reducers';


interface AppProps {
    dummy: DummyData[];
    dummyAction: Function; // bypass redux-thunk returning a function and typescript complaining about type
    dummyDeleteAction: typeof dummyDeleteAction;
}

interface AppState {
    fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = { fetching: false };
    }

    componentDidMount() {
        console.log('DDDDDDDDDDDd');
        let t = this.props.dummyAction();
        console.log(t);
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.dummy.length && this.props.dummy.length) {
            this.setState({ fetching: false });
        }
    }

    renderList(): JSX.Element[] {
        return this.props.dummy.map((dummy: DummyData) => {
          return <div key={dummy.id}>{dummy.title}</div>;
        });
    }

    deleteItem = (): void => {
        this.setState({ fetching: true });
        this.props.dummyDeleteAction(1);
    }

    render() {
        
        return (
            <div>
                <div>Testing...</div>
                { this.state.fetching? 'loading ...': null }
                {this.renderList()}
                <button onClick={this.deleteItem}>Delete item</button>
            </div>);
    }
}

const mapStateToProps = (state: StoreState): { dummy: DummyData[] } => {
  return { dummy: state.dummy };
};

export const App = connect(mapStateToProps, { dummyAction, dummyDeleteAction })(_App);