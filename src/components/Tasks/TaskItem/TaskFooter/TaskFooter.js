import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

import classes from './TaskFooter.module.css';

const TaskFooter = ({ lastUpdateDate, createDate }) => {
    return (
        <div className={classes.cardBottomText}>
            <div>
                <FontAwesomeIcon icon={faCalendarDay} /> {new Date(lastUpdateDate * 1000).toLocaleString()}
            </div>
            <div>
                <FontAwesomeIcon icon={faCalendarPlus} /> {new Date(createDate * 1000).toLocaleDateString()}
            </div>
        </div>
    )
}

export default TaskFooter;
