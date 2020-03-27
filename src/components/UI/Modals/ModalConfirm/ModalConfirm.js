import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = (props) => {
    const confirmHandler = () => {
        props.onConfirm();
        props.hideModal();
    }

    return (
        <Modal show={props.show} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>Cancel</Button>
                <Button
                    variant="primary"
                    onClick={confirmHandler}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;
