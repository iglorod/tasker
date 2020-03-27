import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertResult = (props) => {
    if (props.result.message) {
        return (
            <Alert variant={props.result.error ? 'danger' : 'success'} onClose={props.hideAlert} dismissible>
                <p style={{ margin: '0' }}>{props.result.message}</p>
            </Alert>
        );
    }

    return null;
}

export default AlertResult;
