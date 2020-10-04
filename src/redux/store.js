import        { createStore }           from 'redux';
import        { compose }               from 'redux';
import        { applyMiddleware }       from 'redux';
import        { rootReducer }           from '../redux/reducer/index';
import          ReduxThunk              from 'redux-thunk';


export const store = createStore (rootReducer, compose (applyMiddleware (ReduxThunk)));

window.store = store;