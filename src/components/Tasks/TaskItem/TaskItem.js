import React from 'react';
import { Card } from 'react-bootstrap';

import TaskHeader from './TaskHeader/TaskHeader';
import TaskFooter from './TaskFooter/TaskFooter';
import TaskTitle from './TaskTitle/TaskTitle';
import classes from './TaskItem.module.css';

const TaskItem = (props) => {
    return (
        <Card className={classes.cardDiv} bg={'light'} text={'dark'}>
            <TaskHeader
                sender={props.task.sender}
                openShareTaskModal={props.openShareTaskModal}
                openLeaveTaskModal={props.openLeaveTaskModal} />
            <Card.Body>
                <TaskTitle title={props.task.title} />
                <Card.Text className={classes.cardText}>{props.task.description}</Card.Text>
                <TaskFooter lastUpdateDate={props.task.lastUpdateDate} createDate={props.task.date} />
            </Card.Body>
        </Card>
    )
}

export default TaskItem;
