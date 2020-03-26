import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    fetching: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START: {
            return {
                ...state,
                fetching: true,
            }
        }

        case actionTypes.FETCH_TASKS: {
            return {
                ...state,
                tasks: [...action.tasks]
            }
        }

        default: return state;
    }
}

export default reducer;
