import React from 'react';
import { Alert } from 'react-bootstrap';

import classes from './AlertMessage.module.css';

const AlertMessage = (props) => {
    if (props.result.message) {
        return (
            <Alert
                className={classes.alert}
                variant={props.result.error ? 'danger' : 'success'}
                onClose={props.hideAlert ? props.hideAlert : () => { }}
                dismissible={props.hideAlert}
            >
                <p style={{ margin: '0' }}>{props.result.message}</p>
            </Alert>
        );
    }

    return null;
}

export default AlertMessage;
