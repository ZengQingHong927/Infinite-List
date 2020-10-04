import        { combineReducers }               from 'redux';
import        { reducer as todoReducer }        from '../reducer/todo';
import          ticketReducer                   from '../reducer/tickets';


export const rootReducer = combineReducers ({
        todos:          todoReducer,
        tickets:        ticketReducer
});