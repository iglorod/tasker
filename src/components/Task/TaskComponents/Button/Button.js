import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

import classes from '../TaskComponents.module.css';

const TaskButton = (props) => {
    return (
        <React.Fragment>
            <Button
                className={classes.button}
                disabled={props.loading}
                onClick={props.onClick}
            >
                {props.label}
                {props.loading ? <Spinner size="sm" animation={'border'} variant={'light'} /> : null}
            </Button>
        </React.Fragment>
    )
}

export default TaskButton;
