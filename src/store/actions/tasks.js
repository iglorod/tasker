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

export const reciveTaskActionCreator = (data) => {
    return {
        type: actionTypes.RECIVE_TASK,
        data,
    }
}

export const clearTasksActionCreator = () => {
    return {
        type: actionTypes.CLEAR_TASKS,
    }
}

export const leaveTaskActionCreator = (taskId) => {
    return {
        type: actionTypes.LEAVE_TASK,
        taskId,
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

export const leaveTaskAction = (taskId, data) => {
    return dispatch => {
        axios.patch(`/task/leave/${taskId}`, data)
            .then(() => {
                dispatch(leaveTaskActionCreator(taskId))
            })
    }
}

