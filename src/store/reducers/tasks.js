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
                fetching: false,
                tasks: [...action.tasks]
            }
        }

        case actionTypes.LEAVE_TASK: {
            const tasks = state.tasks.filter(task => task._id !== action.taskId);

            return {
                ...state,
                tasks: [...tasks]
            }
        }

        default: return state;
    }
}

export default reducer;
