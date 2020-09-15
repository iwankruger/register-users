import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { App } from './components/App';
import UsersShow from './components/UsersShow';
import UsersAddOrEdit from './components/UsersAddOrEdit';


// for state debugging plugin replace in production with
//const store = createStore(reducers, applyMiddleware(thunk));
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));




ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/users/:id" component={UsersAddOrEdit} />
                    <Route path="/users" component={UsersShow} />
                    <Route path="/dummy" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root'));
 