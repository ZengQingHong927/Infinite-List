
import  { ADD_TODO_TYPE }       from '../actions/todos';
const initState = [
        // {id: new Date ().getTime (), text: 'hello world'}
];

export const reducer = (state = initState, action) => {
        // eslint-disable-next-line default-case
        switch (action.type) {
                case ADD_TODO_TYPE: {
                        return [
                                ...state,
                                action.payload,
                        ];
                }
                case 'add_todo_request': {
                        return;
                }
                default: {
                        return state;
                }
        }
}