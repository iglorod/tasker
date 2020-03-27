import React from 'react';
import { FormControl } from 'react-bootstrap';

import classes from '../TaskComponents.module.css';

const Description = (props) => {
    return (
        <React.Fragment>
            <h4 className={classes.label}>Description</h4>
            <FormControl
                as={'textarea'}
                value={props.value}
                placeholder={'Type task description'}
                onChange={props.onChange.bind(this, 'description')} />
        </React.Fragment>
    )
}

export default Description;
