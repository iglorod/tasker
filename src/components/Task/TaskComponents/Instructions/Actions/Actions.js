import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import ItemsAction from './Action/Action';
import classes from '../../TaskComponents.module.css';

const InsctructionsActions = (props) => {
    return (
        <ListGroup.Item>
            <div className={classes.manageItems}>
                <ItemsAction
                    actionClass={classes.addItem}
                    icon={faPlusCircle}
                    text={' Add one'}
                    onClick={props.onAdd} />

                <ItemsAction
                    actionClass={classes.removeItem}
                    icon={faMinusCircle}
                    text={' Remove one'}
                    onClick={props.onRemove} />
            </div>
        </ListGroup.Item>
    )
}

export default InsctructionsActions;
