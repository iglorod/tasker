import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Actions from './Actions/Actions';
import Instruction from './Inctruction/Instruction';
import classes from '../TaskComponents.module.css';

const Instrcutions = (props) => {
    return (
        <div className={'recipeChunk'}>
            <h4 className={classes.label}>Instrcutions</h4>
            <ListGroup>
                <Actions
                    onAdd={props.onAdd.bind(this, props.type)}
                    onRemove={props.onRemove.bind(this, props.type)} />
                {
                    props.items.map((item, index) => {
                        return (
                            <Instruction
                                key={index}
                                text={item}
                                number={index + 1}
                                onChange={props.onChange.bind(this, index, props.type)} />
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default Instrcutions;
