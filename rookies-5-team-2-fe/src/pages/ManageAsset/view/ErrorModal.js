import {Modal} from "react-bootstrap";

export default function ErrorModal({show, setShow}) {
    
    return (
        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title style={{color:"red", fontWeight:"bold"}}>Can not delete asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cannot delete the asset because it may has been deleted before you click. Please refresh the page to get newest asset list!</p>
            </Modal.Body>
        </Modal>
    )
}