var initState = [{task: 'navbar rwd design'}];

function ticketReducer (state = initState, action) {
        switch (action.type) {
                case 'daily': {
                        return [
                                ...state,
                                ...action.payload
                        ];
                }
                case 'weekly': {
                        return [
                                ...state
                        ];
                }
                default: {
                        return [...state];
                }
        }
}

export default ticketReducer;