// action creator

// const sleepP = function (ms) {
//         return new Promise (resolve => setTimeout (resolve, ms));
// };


export const ADD_TODO_TYPE = 'add_todo';

export const addToDo = function (text) {
        
        return async (dispatch) => {

                let     api     = `http://127.0.0.1:3010/user/read?phone_num=${text}`

                let     resjson = await fetch (api, {
                        method: 'GET',
                        headers: {
                                'Content-Type': 'application/json'
                        }
                })
                .then (res => res.json ());

                dispatch ({
                        type: ADD_TODO_TYPE,
                        payload: {
                                id:     resjson.item ? resjson.item._id : new Date ().getTime (),
                                text:   resjson.item ? resjson.item.email : 'Not Found',
                        }
                })
        };
}
