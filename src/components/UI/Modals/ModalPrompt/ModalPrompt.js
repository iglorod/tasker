import React, { useState } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';

const ModalPrompt = (props) => {
    const [inputValue, setInputValue] = useState('');

    const inputChangeHandler = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    }

    const modalCloseHandler = () => {
        props.hideModal();
        setInputValue('');
    }

    const confirmHandler = () => {
        props.onConfirm(inputValue);
        modalCloseHandler();
    }

    return (
        <React.Fragment>
            <Modal show={props.show} onHide={modalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        value={inputValue}
                        placeholder={props.placeholder}
                        onChange={inputChangeHandler} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalCloseHandler}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={confirmHandler}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default ModalPrompt;
