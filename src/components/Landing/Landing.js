import          React                   from 'react';
import        { useCallback }           from 'react';
import        { useState }              from 'react';
import        { Fragment }              from 'react';
// import        { useSelector }           from 'react-redux';
import        { connect }               from 'react-redux';
import        { useDispatch }           from 'react-redux';

import        { addToDo }               from '../../redux/actions/todos';

function Header (props) {

        let   { todos,
                // tickets
        }       = props;

        let   [text, setText]   = useState ('');

        let     dispatch        = useDispatch ();

        
        // let     todos   = useSelector ((store) => store.todos);
        // console.log (todos);
        // console.log (tickets);
        
        let onChangeTextInputM = useCallback (onChangeTextInput, [text]);
        
        function onChangeTextInput (e) {
                let     val     = e.currentTarget.value;
                setText (val);
        }
        
        function onAddToDo () {
                dispatch (addToDo (text));
        }

        return (
                <Fragment>
                        <input type='text' value={text} onChange={onChangeTextInputM} />
                        <div>
                                <h3>Accounts:</h3>
                                <ul>
                                        {!!todos.length && todos.map (todo => {
                                                return <li key={todo.id}>{todo.text}</li>;
                                        })}
                                </ul>
                        </div>
                        <button onClick={onAddToDo}>Inquiry</button>
                </Fragment>
        );
}

var mapStateToProps = (state) => {
        return {
                todos:          state.todos,
                tickets:        state.tickets
        };
};


export default connect (mapStateToProps)(Header);