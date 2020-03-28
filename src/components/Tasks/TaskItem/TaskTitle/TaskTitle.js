import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import classes from './TaskTitle.module.css';

const TaskTitle = ({ id, title }) => {
    return (
        <Card.Title className={classes.cardTitle}>
            <Link to={{
                pathname: '/edit-task',
                state: { taskId: id }
            }}>
                {title}
            </Link>
        </Card.Title >

    )
}

export default TaskTitle;
