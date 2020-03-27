import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

import TaskMenu from './TaskMenu/TaskMenu';

const TaskHeader = (props) => {
    const taskSharedBy = props.sender || 'Task Author';

    return (
        <Card.Header>
            <FontAwesomeIcon icon={faTasks} /> {taskSharedBy}
            <TaskMenu openShareTaskModal={props.openShareTaskModal} />
        </Card.Header>
    )
}

export default TaskHeader;
