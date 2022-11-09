import React, { useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../constants/index"
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const initialState = {
  id: null,
  requestedBy: "",
};

const ReturnModal = ({ row, setOpenModal, getAllAssign, props }) => {
  const [assignments, setAssignments] = useState(initialState);
  useEffect(() => {
    if (row) {
      setAssignments({
        id: row,
        requestedBy: localStorage.getItem("username")
      });
    }
  }, [row]);

  const changeState = () => {
    console.log(assignments);
    axios
      .put(`${API_URL}assignments/edit-state`, assignments, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data != null) {
          // setAssignments(initialState);
          setOpenModal(false);
          getAllAssign();
          toast.success("You have just successfully made returning request for this assignment!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    
        } else {
          alert("!!!not success!!!");
        }
      });
  };

  return (
    <div>
      <Modal
        show="true"
        centered backdrop="static"
        dialogClassName="custom-modal-style">
        <Modal.Header closeButton onClick={() => {
          setOpenModal(false);
        }}>
          <Modal.Title>Returning Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to create a returning request for this asset?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changeState} className="yes-btn">
            Yes
          </Button>
          <Button variant="secondary" onClick={() => {
            setOpenModal(false);
          }} className="no-btn">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReturnModal;
