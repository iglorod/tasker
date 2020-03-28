import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faEllipsisV, faShareSquare } from '@fortawesome/free-solid-svg-icons';

import classes from './TaskMenu.module.css';

const TaskMenu = (props) => {
    const clickHandler = (func, event) => {
        event.stopPropagation();
        func();
    }

    return (
        <OverlayTrigger
            trigger={'focus'}
            delay={100}
            rootCloseEvent={'click'}
            placement={'bottom'}
            overlay={
                <Popover>
                    <Popover.Content className={classes.popoverBody}>
                        <div
                            className={classes.popoverItem}
                            onClick={clickHandler.bind(this, props.openShareTaskModal)}>
                            <FontAwesomeIcon className={classes.leaveIcon} icon={faShareSquare} /> Share task
                        </div>
                        <hr></hr>
                        <div
                            className={classes.popoverItem}
                            onClick={clickHandler.bind(this, props.openLeaveTaskModal)}>
                            <FontAwesomeIcon className={classes.leaveIcon} icon={faDoorOpen} /> Leve task
                        </div>
                    </Popover.Content>
                </Popover>
            }
        >
            <button className={classes.leaveIcon}><FontAwesomeIcon icon={faEllipsisV} /></button>
        </OverlayTrigger>
    )
}

export default TaskMenu;
