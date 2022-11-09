import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./YesNoModal.css";

/* YesNoModal component
* List of props:
* show - boolean variable to show/not show the modal
* handleClose - function executed when click button Close or No
* handleSubmit - function executed when click button Yes
* heading - heading text
* body - body text
* submitText - text in button Yes
* cancelText - text in button No
**Example use:

import YesNoModal from "../../components/YesNoModal"
const Example = () => {

const [show, setShow] = useState(false);

const onCloseModal = () => {
    alert("You click No or Close");
    setShow(false);
}

const onSubmitModal = () => {
    alert("You click Yes");
    setShow(false);
}

const openModal = () => {
    setShow(yes);
}
...
return(
    <>
    <button onClick={() => openModal()}>Open Modal</button>
    <YesNoModal
    show = {show}
    handleClose = {() => onCloseModal()} //You can pass argument to the function
    handleSubmit = {() => onSubmitModal()} //You can pass argument to the function
    heading = "Are you sure?"
    body = "Do you want to delete?"
    submitText = "Yes"
    cancelText = "No"
    />
    </>
)
export default Example;
*/
const YesNoModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            centered 
            backdrop="static"
            keyboard={false}
            dialogClassName="custom-modal-style">
            <Modal.Header closeButton>
                <Modal.Title>{props.heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleSubmit} className="yes-btn">
                    {props.submitText}
                </Button>
                <Button variant="secondary" onClick={props.handleClose} className="no-btn">
                    {props.cancelText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default YesNoModal;