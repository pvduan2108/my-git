import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as moment from "moment-timezone";
import "./UserDetail.css"
export default function UserDetail({ show, setShow, user }) {
    const handleClose = () => setShow(false);
    if (!user) {
        return null;
    }
    return (
        <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}
               className="dhv-assignment-details-modal">
          <Modal.Header closeButton>
            <Modal.Title id="dhv-assignment-details-header">User Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Staff Code
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.staffCode}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Full Name
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.fullName}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Username
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.username}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Date of Birth
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {moment(user.birthDate).format("DD/MM/YYYY")}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Gender
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.gender}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Type
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.type}
                      </div>
                  </div>
              </div>
              <div className="dhv-assignment-details-body">
                  <div className="dhv-assignment-details-body-row">
                      <div className="dhv-assignment-details-body-row-label">
                          Location
                      </div>
                      <div className="dhv-assignment-details-body-row-value">
                          : {user.location?.locationName}
                      </div>
                  </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
  );
}
