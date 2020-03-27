import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import classes from './TaskTitle.module.css';

const TaskTitle = ({ title }) => {
    return (
        <Card.Title className={classes.cardTitle}>
            <Link to={'/#'}>
                {title}
            </Link>
        </Card.Title>

    )
}

export default TaskTitle;
