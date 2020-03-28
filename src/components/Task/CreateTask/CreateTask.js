import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../utility/axios-instance';
import Title from '../TaskComponents/Title/Title';
import Description from '../TaskComponents/Description/Description';
import Instructions from '../TaskComponents/Instructions/Instructions';
import Button from '../TaskComponents/Button/Button';
import ColHOC from '../../UI/ColHOC/ColHOC';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import classes from './CreateTask.module.css';

const CreateTask = (props) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        instructions: [],
    })

    const [savingTask, setSavingTask] = useState(false);
    const [resultMessage, setResultMessage] = useState({});

    if (!props.userId) return <Redirect to={'/sign-in'} />

    const onAddInstructionHandler = () => {
        setTask(prevTask => {
            const newItems = [...prevTask.instructions];
            newItems.push('');

            return {
                ...prevTask,
                instructions: [...newItems]
            }
        })
    }


    const onRemoveInstructionHandler = (item) => {
        setTask(prevTask => {
            const newItems = [...prevTask.instructions];
            newItems.pop();

            return {
                ...prevTask,
                instructions: [...newItems]
            }
        })
    }

    const onTextChangeHandler = (item, event) => {
        const newValue = event.target.value;
        setTask(prevTask => ({
            ...prevTask,
            [item]: newValue,
        }))
    }

    const onChangeInstrcutionHandler = (index, item, event) => {
        const newInstrcutionValue = event.target.value;
        setTask(prevTask => {
            const newItems = [...prevTask.instructions];
            newItems[index] = newInstrcutionValue;

            return {
                ...prevTask,
                instructions: [...newItems]
            }
        })
    }

    const hideAlert = () => {
        setResultMessage({});
    }

    const validateTask = () => {
        let isValid = true;

        for (let key in task) {
            if (key === 'instructions') {
                const arr = clearArray(task[key]);
                isValid = arr.length > 0 && isValid;
            } else {
                isValid = task[key].length > 0 && isValid;
            }
        }

        return isValid;
    }

    const clearArray = (arr) => {
        return arr.filter(item => item.trim().length > 0);
    }

    const formTask = () => {
        const date = Math.floor((new Date().getTime() / 1000));

        let taskData = {
            title: task.title,
            description: task.description,
            instructions: clearArray(task.instructions),
            ownerId: props.userId,
            date,
        }

        return taskData;
    }

    const createRecipeHandler = () => {
        if (!validateTask()) {
            setResultMessage({
                message: 'Please fill all fields',
                error: true,
            });
            return;
        }

        setSavingTask(true);
        setResultMessage({});

        const taskData = formTask();

        axios.post('/task', taskData)
            .then(() => {
                props.history.push('/');
            })
            .catch(error => {
                setSavingTask(false);
                setResultMessage({
                    message: 'Something went wrong...',
                    error: true
                })
            })
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={1} md={2} lg={3}></Col>
                <Col sm={10} md={8} lg={6}>
                    <Row className={classes.inputsBlock}>
                        <ColHOC>
                            <Title
                                mainTitle={'Create Task'}
                                value={task.title}
                                onChange={onTextChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <Description
                                value={task.description}
                                onChange={onTextChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <Instructions
                                items={task.instructions}
                                onAdd={onAddInstructionHandler}
                                onRemove={onRemoveInstructionHandler}
                                onChange={onChangeInstrcutionHandler} />
                        </ColHOC>

                        <ColHOC>
                            <AlertMessage result={resultMessage} hideAlert={hideAlert} />
                        </ColHOC>

                        <ColHOC>
                            <Button
                                label={'Create task '}
                                loading={savingTask}
                                onClick={createRecipeHandler} />
                        </ColHOC>
                    </Row>
                </Col>
                <Col sm={1} md={2} lg={3}></Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.id,
    }
}

export default connect(mapStateToProps)(CreateTask);
