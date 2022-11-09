import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import {disableUser} from "../utils/api";
import {toast} from "react-toastify";
import ErrorModal from "./ErrorModal";

export default function DisableUserModal({ show, setShow, user }) {
    const handleClose = () => setShow(false);
    // const [errorModal, setErrorModal] = useState(false);
    if (!user) {
        return null;
    }
    const handleSubmit = () => {
        disableUser(user).then((response) => {
            handleClose();
            window.location.reload();
            toast.success("Disable user success", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log("success case")
        }).catch(function (error) {
            if (error.request.status === 400) {
                setShow(false)
                // setErrorModal(true);
                console.log("bad case")
            } else {
                window.location.reload();
                console.log("undefined case")
            }

        })

        handleClose();
    }
    return (
        <div>
            <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "red", fontWeight: "bold"}}>Are you sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to disable this user ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary-edit" onClick={handleSubmit}>Disable</Button>
                    <Button variant="primary-edit" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*<ErrorModal show={errorModal} setShow={setErrorModal}/>*/}
        </div>
    );
}
