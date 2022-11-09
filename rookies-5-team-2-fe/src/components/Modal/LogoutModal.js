import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Modal, NavDropdown} from "react-bootstrap";
import "./Logout.css"
import {toast} from "react-toastify";
const LogoutModal = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleYes = () => {
        setShow(false);
        localStorage.removeItem('username');
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('authority');
        localStorage.removeItem('firstTime');
        localStorage.removeItem('locationCode');
        localStorage.removeItem('mockPassword')
        navigate("/")
        window.location.reload();
        toast.success('You have logged out !', {
            icon:"🚀",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <NavDropdown.Item variant="outline-primary" onClick={handleShow}>
                Logout
            </NavDropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"red", fontWeight:"bold"}}>Are you sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary-edit" onClick={handleYes} >
                        Log out
                    </Button>
                    <Button variant="primary-edit" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default LogoutModal;
