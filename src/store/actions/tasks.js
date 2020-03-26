import axios from '../../utility/axios-instance';
import * as actionTypes from './actionTypes';

export const startFetchingActionCreator = () => {
    return {
        type: actionTypes.FETCH_START,
    }
}

export const fetchTasksActionCreator = (tasks) => {
    return {
        type: actionTypes.FETCH_TASKS,
        tasks,
    }
}

export const fetchTasksAction = (userId) => {
    return dispatch => {
        dispatch(startFetchingActionCreator());
        axios.get(`/task/list/${userId}`)
            .then(tasks => {
                dispatch(fetchTasksActionCreator(tasks.data))
            })
    }
}

