import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../../utility/axios-instance';
import { fetchTasksAction } from '../../store/actions/tasks';
import TaskItem from './TaskItem/TaskItem';
import ModalSpinner from '../UI/ModalSpinner/ModalSpinner';
import ModalPrompt from '../UI/ModalPrompt/ModalPrompt';
import AlertDismiss from '../UI/AlertDismiss/AlertDismiss';

const Tasks = (props) => {
    const [loading, setLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareTaskId, setShareTaskId] = useState();
    const [shareResultAlert, setShareResultAlert] = useState({});

    useEffect(() => {
        props.fetchTasks(props.userId);
        setLoading(false);
    }, [])


    if (props.fetching || loading) return <ModalSpinner />;


    const openShareTaskModal = (taskId) => {
        setShareModalOpen(true);
        setShareTaskId(taskId);
    }

    const closeShareTaskModal = () => {
        setShareModalOpen(false);
        setShareTaskId({});
    }

    const handleError = (error) => {
        setShareResultAlert({
            message: error.response.data.message || 'Something went wrong. Please, try later...',
            error: true
        });
    }

    const shareTaskHandler = (userEmail) => {
        setShareResultAlert({});

        const taskData = {
            email: userEmail,
            senderId: props.userId,
        }

        axios.patch(`/task/share/${shareTaskId}`, taskData)
            .then(() => {
                setShareResultAlert({
                    message: 'Task sent successfully',
                    error: false
                })
            })
            .catch(error => {
                handleError(error);
            })
    }

    const clearShareAlert = () => {
        setShareResultAlert({});
    }

    return (
        <Container>
            <ModalPrompt
                show={shareModalOpen}
                title={'Share the task'}
                placeholder={'Email'}
                hideModal={closeShareTaskModal}
                shareTask={shareTaskHandler} />
            <AlertDismiss
                result={shareResultAlert}
                hideAlert={clearShareAlert} />
            <Row>
                {
                    props.tasks.map(task => {
                        return (
                            <Col sm={6} md={4} lg={3} className={'mb-3'} key={task._id}>
                                <TaskItem task={task} openShareTaskModal={openShareTaskModal.bind(this, task._id)} />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: (userId) => { dispatch(fetchTasksAction(userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
