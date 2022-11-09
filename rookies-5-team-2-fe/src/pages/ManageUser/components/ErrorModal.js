import {Modal} from "react-bootstrap";

export default function ErrorModal({show, setShow}) {
    return (
        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title style={{color:"red", fontWeight:"bold"}}>Can not disable user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>There are valid assignments belonging to this user</p>
                <p>Please close all assignments before disabling users</p>
            </Modal.Body>
        </Modal>
    )
}