import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { App } from './components/App';
import ShowUsers from './components/ShowUsers';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, applyMiddleware(thunk));
//const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/users" component={ShowUsers} />
                    <Route path="/dummy" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root'));
 