import React from 'react';
import { FormControl } from 'react-bootstrap';

import classes from '../TaskComponents.module.css';

const TaskTitle = (props) => {
    return (
        <React.Fragment>
            <h3 className={classes.createTaskLabel}>{props.mainTitle}</h3>
            <h4 className={classes.label}>Title</h4>
            <FormControl
                value={props.value}
                placeholder={'Type task title'}
                onChange={props.onChange.bind(this, 'title')} />
        </React.Fragment>
    )
}

export default TaskTitle;
