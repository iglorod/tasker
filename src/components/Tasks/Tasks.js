import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from '../../utility/axios-instance';
import TaskItem from './TaskItem/TaskItem';
import ModalSpinner from '../UI/Modals/ModalSpinner/ModalSpinner';
import ModalPrompt from '../UI/Modals/ModalPrompt/ModalPrompt';
import ModalConfirm from '../UI/Modals/ModalConfirm/ModalConfirm';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import {
    fetchTasksAction,
    leaveTaskAction,
    clearTasksActionCreator,
    reciveTaskActionCreator
} from '../../store/actions/tasks';

const Tasks = (props) => {
    const [loading, setLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [choosedTaskId, setChoosedTaskId] = useState();
    const [shareResultAlert, setShareResultAlert] = useState({});

    useEffect(() => {
        props.fetchTasks(props.userId);
        setLoading(false);

        props.socket.on('recive-shared-task', (data) => {
            console.log('revive task');
            if (data.to === props.userEmail) props.reciveTask(data);
        });

        return () => {
            props.socket.removeListener('recive-shared-task');
            props.clearTasksList();
        }
    }, [])


    if (!props.userId) return <Redirect to={'/sign-in'} />
    if (props.fetching || loading) return <ModalSpinner />;


    const openLeaveTaskModal = (taskId) => {
        setLeaveModalOpen(true);
        setChoosedTaskId(taskId);
    }

    const closeLeaveTaskModal = () => {
        setLeaveModalOpen(false);
        setChoosedTaskId();
    }

    const openShareTaskModal = (taskId) => {
        setShareModalOpen(true);
        setChoosedTaskId(taskId);
    }

    const closeShareTaskModal = () => {
        setShareModalOpen(false);
        setChoosedTaskId();
    }

    const handleError = (error) => {
        setShareResultAlert({
            message: error.response.data.message || 'Something went wrong. Please, try later...',
            error: true
        });
    }

    const shareTaskHandler = (reciverEmail) => {
        setShareResultAlert({});

        const taskData = {
            email: reciverEmail,
            senderId: props.userId,
        }

        axios.patch(`/task/share/${choosedTaskId}`, taskData)
            .then(() => {
                setShareResultAlert({
                    message: 'Task sent successfully',
                    error: false
                })

                const sharedTask = props.tasks.find(task => task._id === choosedTaskId);

                props.socket.emit('share-task', props.userEmail, reciverEmail, sharedTask);  // (event, from, to, data) 
            })
            .catch(error => {
                handleError(error);
            })
    }

    const clearShareAlert = () => {
        setShareResultAlert({});
    }

    const leaveTask = () => {
        const data = {
            userId: props.userId
        }

        props.leaveTask(choosedTaskId, data);
    }

    return (
        <Container>
            <ModalPrompt                // Modal for sharing task
                show={shareModalOpen}
                title={'Share the task'}
                placeholder={'Email'}
                hideModal={closeShareTaskModal}
                onConfirm={shareTaskHandler} />

            <ModalConfirm               // Modal for leaving task
                show={leaveModalOpen}
                title={'Leave this task?'}
                hideModal={closeLeaveTaskModal}
                onConfirm={leaveTask} />

            <AlertMessage                // Alert for report about the results of task sharing
                result={shareResultAlert}
                hideAlert={clearShareAlert} />

            <Row>
                {
                    props.tasks.map(task => {
                        return (
                            <Col sm={6} md={4} lg={3} className={'mb-3'} key={task._id}>
                                <TaskItem
                                    task={task}
                                    openShareTaskModal={openShareTaskModal.bind(this, task._id)}
                                    openLeaveTaskModal={openLeaveTaskModal.bind(this, task._id)} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        fetching: state.task.fetching,
        tasks: state.task.tasks,
        userId: state.auth.id,
        userEmail: state.auth.email,
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: (userId) => { dispatch(fetchTasksAction(userId)) },
        clearTasksList: () => { dispatch(clearTasksActionCreator()) },
        reciveTask: (data) => { dispatch(reciveTaskActionCreator(data)) },
        leaveTask: (taskId, data) => { dispatch(leaveTaskAction(taskId, data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
