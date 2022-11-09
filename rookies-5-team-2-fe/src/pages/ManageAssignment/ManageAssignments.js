import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { FaSearch } from "react-icons/fa";
import { FaPen, FaUndo } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrClose } from "react-icons/gr";
import { validateSearchBox } from "./EditAssignment/Validation";
import ReturnModal from "./components/ReturnModal";
import "./Assignment.css";
import productApi from "./AssignmentAxios/ProductApi";
import YesNoModal from "../../components/YesNoModal";
import {AiTwotoneCalendar} from "react-icons/ai";
import { toast } from "react-toastify";
import { mapState } from "../RequestForReturning/utils";
import { ASSIGNMENTSTATE_WFA, ASSIGNMENTSTATE_ACT, ASSIGNMENTSTATE_WFR, ASSIGNMENTSTATE_DEC } from "../../constants";
const ManageAssignments = () => {
  let navigate = useNavigate();
  const handleEdit = (editData) => {
    localStorage.setItem("editAssignmentData", JSON.stringify(editData));
    navigate("/edit_assignment");
  };
  const handleDelete = () => {
    setShowDeletePopup(true);
  };
  const handleDeleteButton = () => {
    console.log("Delete" + deteleById);
    productApi.deleteAssignment(deteleById).then((res) => {
      if(res.status === 200){
      console.log(res.data);
      toast.success("Delete assignment successfully !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSearchResult(data.filter((item) => item.id !== deteleById));
    }
    });
    setRe(deteleById);
    setShowDeletePopup(false);
  }

  const handleCancelButoon = () => {
    setShowDeletePopup(false);
  };
  const [deteleById, setDeleteById] = useState();
  const [Id, setId] = useState("");
  const [re, setRe] = useState();
  const handleReturn = (id) => {
    setId(id);
    setModalOpen(true);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const columns = [
    {
      name: "No.",
      selector: (row) => row.id,
      sortable: true,
      width: "6vw",
    },
    {
      name: "Asset Code",
      selector: (row) => row.assetCode,
      sortable: true,
      // width: "8vw",
    },
    {
      name: "Asset Name",
      selector: (row) => row.assetName,
      sortable: true,
      // width: "8vw",
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
      sortable: true,
      // width: "8vw",
    },
    {
      name: "Assigned By",
      selector: (row) => row.assignedBy,
      sortable: true,
      // width: "8vw",
    },
    {
      name: "Assigned Date",
      selector: (row) => row.assignedDate,
      sortable: true,
      // width: "8vw",
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
            onClick={handleEdit.bind(this, d)}
            style={{ cursor: "pointer", color: "blue", }}
            className="dhv-action-icons"
            disabled={!d.state.toLowerCase().includes("acceptance")}
            title="Edit"
          >
            <FaPen />
          </button>
          <button
            onClick={() => {
              handleDelete();
              setDeleteById(d.id);
            }}
            style={{ cursor: "pointer", color: "red", fontSize: "1.5em" }}
            className="dhv-action-icons"
            disabled={d.state.toLowerCase() === "accepted" || d.state.toLowerCase() === "waiting_for_returning"}
            title="Delete"
          >
            <MdClear />
          </button>
          <button
            disabled={!d.canReturn}
            onClick={() => handleReturn(d.id)}
            style={{ cursor: "pointer", color: "green", }}
            className="dhv-action-icons"
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
  const [searchResult, setSearchResult] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignmentState, setAssignmentState] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  useEffect(() => {
    const objNode = {
      locationCode: localStorage.getItem("locationCode"),
      assignmentId: localStorage.getItem("assignmentId"),
    };
    productApi.getAllAssignments(objNode).then((res) => {
      // res.data.sort((a, b) => (b.id - a.id));
      setData(res.data);
      console.log(res.data);
      localStorage.removeItem("assignmentId");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [re]);

  function getAllAssign() {
    const objNode = {
      locationCode: localStorage.getItem("locationCode"),
      assignmentId: localStorage.getItem("assignmentId"),
    };
    productApi.getAllAssignments(objNode).then((res) => {
      console.log(objNode.locationCode);
      setData(res.data);
      localStorage.removeItem("assignmentId");
    });

  }

  useEffect(() => {
    setSearchResult(data.filter(
      (item) =>
        (item.assetCode.toLowerCase().includes(searchTerm) ||
          item.assignedTo.toLowerCase().includes(searchTerm) ||
          item.assignedBy.toLowerCase().includes(searchTerm) ||
          item.assetName.toLowerCase().includes(searchTerm)) &&
        item.state.toLowerCase().includes(assignmentState.toLocaleLowerCase()) &&
        item.assignedDate.includes(assignmentDate)
    ));
  }
    , [searchTerm, assignmentState, assignmentDate, data]);

  /* Handle state filter */
  const [stateText, setStateText] = useState("States");

  /* Handle datepicker */
  const [startDate, setStartDate] = useState();
  const [showButton, setShowButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  /* Handle create new assignment */
  function handleCreate() {
    navigate("/assignments/create");
  }

  /* Setup for assignment details modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rowData, setRowData] = useState({
    id: "",
    assigned_by: "",
    assigned_to: "",
    assigned_date: "",
    accepted_by: "",
    asset_code: "",
    state: "",
    note: "",
    return_date: "",
    requestedBy: "",
    assetName: "",
  });

  /* Validation */
  const [searchTermValid, setSearchTermValid] = useState("");
  const searchTermErrorMessage = validateSearchBox(searchTermValid);
  const [hasChanged, setHasChanged] = useState(false);
  /* Render content */
  return (
    <>
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
              <div className="dhv-assignment-details-body-row-label">No.</div>
              <div className="dhv-assignment-details-body-row-value">
                : {rowData.id}
              </div>
            </div>
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
      <div className="rookie-container">
        <div className="dhv-page-header">
          <div className="dhv-page-header-title">
            <div id="dhv-page-header-title">Assignment List</div>
          </div>
          <div className="dhv-page-header-functions">
            <div className="dhv-page-header-functions-state">
              <Dropdown as={ButtonGroup}>
                <Button
                  variant="success"
                  onClick={() => {
                    setStateText("States");
                    setAssignmentState("");
                  }}
                >
                  {stateText}
                </Button>
                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setStateText("Accepted");
                      setAssignmentState(ASSIGNMENTSTATE_ACT);
                    }}
                  >
                    Accepted
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStateText("WFA");
                      setAssignmentState(ASSIGNMENTSTATE_WFA);
                    }}
                  >
                    Waiting for acceptance
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStateText("WFR");
                      setAssignmentState(ASSIGNMENTSTATE_WFR);
                    }}
                  >
                    Waiting for returning
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStateText("Declined");
                      setAssignmentState(ASSIGNMENTSTATE_DEC);
                    }}
                  >
                    Declined
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="dhv-page-header-functions-datepicker" onContextMenu={(e)=>e.preventDefault()}>
              <DatePicker
                disabled
                id={
                  showButton
                    ? "dhv-page-header-functions-datepicker-input-with-button"
                    : "dhv-page-header-functions-datepicker-input"
                }
                open={showDatePicker}
                dateFormat="dd/MM/yyyy"
                placeholderText="Assigned Date"
                showMonthDropdown
                showYearDropdown
                peekNextMonth
                dropdownMode="select"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off"
                selected={startDate}
                onClickOutside={() => {
                  setShowDatePicker(false);
                }}
                onChange={(date) => {
                  if (date.getMonth() + 1 < 10) {
                    var month = "0" + (parseInt(date.getMonth().toString()) + 1).toString();
                  } else {
                    month = (parseInt(date.getMonth().toString()) + 1).toString();
                  }
                  console.log("Month: " + month);
                  if (date.getDate() < 10) {
                    var day = "0" + date.getDate().toString();
                  } else {
                    day = date.getDate().toString();
                  }
                  console.log("Day: " + day);
                  var year = date.getFullYear().toString();
                  console.log("Year: " + year);
                  let dateF = day + "/" + month + "/" + year;
                  setShowButton(true);
                  setAssignmentDate(dateF);
                  setStartDate(date);
                  setShowDatePicker(false);
                }}
              />
              {showButton ? (
                <div
                  id="dhv-page-header-functions-datepicker-button"
                  onClick={() => {
                    setAssignmentDate("");
                    setShowButton(false);
                    setStartDate();
                    setShowDatePicker(false);
                  }}
                >
                  <GrClose />
                </div>
              ) : null}
              <div className="dhv-page-header-functions-datepicker-calendar">
                <AiTwotoneCalendar
                  style={{ color: "#cc2239", fontSize: "x-large" }}
                  onClick={() => {
                    setShowButton(true);
                    setStartDate(new Date());
                    setShowDatePicker(true);
                  }}
                />
              </div>
            </div>
            <div className="dhv-page-header-functions-search">
              <InputGroup className="mb-3">
                <Form.Control
                  style={{
                    resize: "none",
                  }}
                  id="dhv-page-header-functions-search-input"
                  placeholder="Type to search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  //we can use onKeyDown to filter right after pressing any key
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setSearchTerm("");
                      setHasChanged(true);
                    }
                    setKeyword(e.target.value);
                    setSearchTermValid(keyword);
                    setHasChanged(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchTerm(keyword.toLowerCase().trim());
                    }
                  }}
                  isValid={!Boolean(searchTermErrorMessage) && hasChanged}
                  isInvalid={Boolean(searchTermErrorMessage)}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  type="submit"
                  onClick={() => {
                    setSearchTerm(keyword);
                  }}
                >
                  <FaSearch />
                </Button>
                <Form.Control.Feedback type="invalid">{searchTermErrorMessage}</Form.Control.Feedback>
              </InputGroup>
            </div>
            <div>
              <Button
                id="dhv-page-header-functions-create"
                onClick={() => {
                  handleCreate();
                }}
              >
                Create New Assignment
              </Button>
            </div>
          </div>
        </div>
        <div className="dhv-react-data-table">
          <DataTable
            columns={columns}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setRowData(row);
              console.log(row);
              console.log(rowData);
              handleShow();
            }}
            data={searchResult}
            defaultSortField="id"
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
          />
        </div>
      </div>
      {modalOpen && <ReturnModal row={Id} setOpenModal={setModalOpen} getAllAssign={getAllAssign} />}
      {showDeletePopup && <YesNoModal show={true} heading={"Are you sure?"} body={"Do you want to delete this assignment?"} submitText={"Delete"} cancelText={"Cancel"} handleClose={handleCancelButoon} handleSubmit={handleDeleteButton} />}
    </>
  );
};
export default ManageAssignments;
