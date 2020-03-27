import React from 'react';
import { ListGroup, Badge, FormControl } from 'react-bootstrap';

import classes from '../../TaskComponents.module.css';

const Instruction = (props) => {
    return (
        <ListGroup.Item className={classes.listItem}>
            <Badge pill variant={'primary'}>{props.number}</Badge>
            <FormControl
                placeholder={'Type your instruction here'}
                value={props.text}
                onChange={props.onChange} />
        </ListGroup.Item>
    )
}

export default Instruction;
