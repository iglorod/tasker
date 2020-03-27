import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

import TaskMenu from './TaskMenu/TaskMenu';
import classes from './TaskHeader.module.css';

const TaskHeader = (props) => {
    const taskSharedBy = props.sender || 'Task Author';

    return (
        <Card.Header>
            <FontAwesomeIcon className={classes.taskIcon} icon={faTasks} />
            <OverlayTrigger
                placement={'top'}
                overlay={
                    <Tooltip>{props.sender ? 'This user share you this task' : 'You created this task'}</Tooltip>
                }
            >
                <p className={classes.sharedBy}>{taskSharedBy}</p>
            </OverlayTrigger>
            <TaskMenu
                openShareTaskModal={props.openShareTaskModal}
                openLeaveTaskModal={props.openLeaveTaskModal} />
        </Card.Header>
    )
}

export default TaskHeader;
