import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaUndo } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { TbCheck } from "react-icons/tb";
import Modal from "react-bootstrap/Modal";
import productApi from "../ManageAssignment/AssignmentAxios/ProductApi";
import { Button } from "react-bootstrap";
import YesNoModal from "../../components/YesNoModal/index";
import "./Home.css";
import FirstLoginModal from "../../components/Modal/FirstLoginModal";
import { toast } from "react-toastify";
import { mapState } from "../RequestForReturning/utils";
import { ASSIGNMENTSTATE_ACT, ASSIGNMENTSTATE_WFR, ASSIGNMENTSTATE_COM, ASSIGNMENTSTATE_DEC } from "../../constants";

const Home = () => {
  const columns = [
    {
      name: "No.",
      selector: (row) => row.id,
      sortable: true,
      width: "6vw",
      omit: true,
    },
    {
      name: "Asset Code",
      selector: (row) => row.assetCode,
      sortable: true,
      width: "11vw",
    },
    {
      name: "Asset Name",
      selector: (row) => row.assetName,
      sortable: true,
      width: "11vw",
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
      sortable: true,
      omit: true,
    },
    {
      name: "Assigned By",
      selector: (row) => row.assignedBy,
      sortable: true,
      width: "11vw",
    },
    {
      name: "Assigned Date",
      selector: (row) => row.assignedDate,
      sortable: true,
      width: "12vw",
    },
    {
      name: "State",
      selector: (row) => mapState(row.state),
      sortable: true,
      width: "13vw",
    },
    {
      name: "Action",
      selector: null,
      sortable: false,
      cell: (d) => [
        <div>
          <button
            onClick={() => {
              setYNAccept(true);
              setRowData(d);
            }}
            style={{ cursor: "pointer", color: "green", fontSize: "1.5vw" }}
            className="dhv-action-icons"
            disabled={d.state.toLowerCase().includes("accepted") || d.state.toLowerCase().includes("returning")}
            title="Accept"
          >
            <TbCheck />
          </button>
          <button
            onClick={() => {
              setYNDecline(true);
              setRowData(d);
            }}
            style={{ cursor: "pointer", color: "red", fontSize: "1.5vw" }}
            className="dhv-action-icons"
            title="Decline"
            disabled={!d.state.toLowerCase().includes("acceptance")}
          >
            <MdClear />
          </button>
          <button
            onClick={() => {
              setYnReturn(true);
              setRowData({
                id: d.id,
                assignedBy: d.assignedBy,
                assignedTo: d.assignedTo,
                assignedDate: d.assignedDate,
                acceptedBy: d.acceptedBy,
                assetCode: d.assetCode,
                state: d.state,
                note: d.note,
                returnDate: d.returnDate,
                requestedBy: localStorage.getItem("username"),
                assetName: d.assetName,
                specificaton: d.specification,
              });
            }}
            style={{ cursor: "pointer", color: "blue", fontSize: "1vw" }}
            className="dhv-action-icons"
            disabled={d.state.toLowerCase() !== "accepted"}
            title="Return"
          >
            <FaUndo />
          </button>
        </div>,
      ],
    },
    {
      name: "Notes",
      selector: (row) => row.note,
      sortable: false,
      omit: true,
    },
    {
      name: "Return Date",
      selector: (row) => row.returnDate,
      sortable: true,
      omit: true,
    },
  ];
  const [data, setData] = useState([]);
  const username = localStorage.getItem("username");
  useEffect(() => {
    const objNode = {
      locationCode: localStorage.getItem("locationCode"),
      assignmentId: localStorage.getItem("assignmentId"),
      username: username,
    };
    productApi.getUserAssignments(objNode).then((res) => {
      setData(res.data);
    });
    localStorage.removeItem("assignmentId");
  }, [username]);

  /* Setup for assignment details modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    if (row.state.toLowerCase().includes("returning") || row.state.toLowerCase().includes("accepted")) {
      setShow(true)
    };
  }
  const [rowData, setRowData] = useState({
    id: "",
    assignedBy: "",
    assignedTo: "",
    assignedDate: "",
    acceptedBy: "",
    assetCode: "",
    state: "",
    note: "",
    returnDate: "",
    requestedBy: "",
    assetName: "",
    specificaton: "",
  });

  /* Setup for yes/no modal */
  const [ynAccept, setYNAccept] = useState(false);
  const [ynDecline, setYNDecline] = useState(false);
  const [ynReturn, setYnReturn] = useState(false);
  const handleCloseYesNo = () => {
    setYNAccept(false);
    setYNDecline(false);
    setYnReturn(false);
  };
  const toastSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  };
  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  };
  const handleDecline = (d) => {
    console.log("decline", d);
    setYNDecline(false);
    productApi.changeAssignmentState(d, ASSIGNMENTSTATE_DEC).then((res) => {
      if (res.status === 200) {
        toastSuccess("Declined Seccessfully!");
        setData(data.filter((row) => row.id !== d.id));
      }
      if (res.status === 418) {
        toastError("Declined Failed!");
      }
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleAccept = (d) => {
    console.log("accept", d);
    setYNAccept(false);
    productApi.changeAssignmentState(d, ASSIGNMENTSTATE_ACT).then((res) => {
      if (res.status === 200) {
        toastSuccess("Accepted Seccessfully!");
        localStorage.setItem("assignmentId", d.id);
        setData(data.map((row) => row.id===d.id?{...row, state: ASSIGNMENTSTATE_ACT}:row));
      }
      if (res.status === 418) {
        toastError("Accepted Failed!");
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  const handleReturn = (d) => {
    console.log("return", d);
    setYnReturn(false);
    productApi.changeAssignmentStateReturn(d).then((res) => {
      if (res.status === 200) {
        toastSuccess("You have just successfully made returning request for this assignment!");
        localStorage.setItem("assignmentId", d.id);
        setData(data.map((row) => row.id===d.id?{...row, state: ASSIGNMENTSTATE_WFR}:row));
      }
      if (res.status === 418) {
        toastError("You have just failed to make returning request for this assignment!");
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  /* Render content */
  return (
    localStorage.getItem("username") ? (
      <>
        <FirstLoginModal />
        <Modal
          show={show}
          onHide={handleClose}
          data={rowData}
          className="dhv-assignment-details-modal"
        >
          <Modal.Header>
            <Modal.Title id="dhv-assignment-details-header">
              Assignment Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="dhv-assignment-details-body">
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">
                  Asset Code
                </div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.assetCode}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">
                  Asset Name
                </div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.assetName}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">Specification</div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.specification}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">
                  Assigned To
                </div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.assignedTo}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">
                  Assigned By
                </div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.assignedBy}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">
                  Assigned Date
                </div>
                <div className="dhv-assignment-details-body-row-value">
                  : {rowData.assignedDate}
                </div>
              </div>
              <div className="dhv-assignment-details-body-row">
                <div className="dhv-assignment-details-body-row-label">State</div>
                <div className="dhv-assignment-details-body-row-value">
                  : {mapState(rowData.state)}
                </div>
              </div>
              <div className="dhv-assignment-details-body-note">
                <div className="dhv-assignment-details-body-note-label">Note</div>
                <div className="dhv-assignment-details-body-note-value">
                  {rowData.note}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <YesNoModal
          show={ynAccept}
          handleClose={() => handleCloseYesNo()}
          heading="Accept Assignment"
          body="Are you sure you want to accept this assignment?"
          handleSubmit={() => {
            handleAccept(rowData);
          }}
          submitText="Accept"
          cancelText="Close"
        />
        <YesNoModal
          show={ynDecline}
          handleClose={() => handleCloseYesNo()}
          heading="Decline Assignment"
          body="Are you sure you want to decline this assignment?"
          handleSubmit={() => {
            handleDecline(rowData);
          }}
          submitText="Decline"
          cancelText="Close"
        />
        <YesNoModal
          show={ynReturn}
          handleClose={() => handleCloseYesNo()}
          heading="Returning Request"
          body="Are you sure you want to return this asset?"
          handleSubmit={() => {
            setRowData({...rowData, requestedBy: localStorage.getItem("username")});
            handleReturn(rowData);
          }}
          submitText="Yes"
          cancelText="No"
        />
        <div className="rookie-container">
          <div className="dhv-home-header">
            <div className="dhv-page-header-title">
              <div id="dhv-page-header-title">My Assignment</div>
            </div>
          </div>
          <div className="dhv-home-body">
            <div className="dhv-home-body-table">
              <DataTable
                columns={columns}
                onRowClicked={(row) => {
                  setRowData(row);
                  handleShow(row);
                }}
                data={data}
                pagination
                highlightOnHover
                pointerOnHover
                dense
              />
            </div>
          </div>
        </div>
      </>) : (
      <div className="rookie-container">
        <>You have not loged in yet!</>
      </div>)
  );
};
export default Home;
