import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { AiTwotoneCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { InputGroup, Form } from "react-bootstrap";
import "./EditAssignment.css";
import "./ResponsiveEditAssignment.css";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import productApi from "../AssignmentAxios/ProductApi";
import { useNavigate } from "react-router-dom";
import { validateAssignmentNote, validateTheSame } from "./Validation";
import {toast} from "react-toastify";
import "./style.css";

const EditAssignment = () => {

  //Handle data connection
  const [assignedTo, setAssignedTo] = useState({});
  const [assignedAsset, setAssignedAsset] = useState({});
  const [userSearch, setUserSearch] = useState([]);
  const [assetSearch, setAssetSearch] = useState([]);
  const [userList, setUserList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const editAssignmentData = JSON.parse(
    localStorage.getItem("editAssignmentData")
  );
  const [editedData, setEditedData] = useState({
    acceptedBy: editAssignmentData.acceptedBy,
    assetCode: editAssignmentData.assetCode,
    assignedBy: editAssignmentData.assignedBy,
    assignedDate: editAssignmentData.assignedDate,
    assignedTo: editAssignmentData.assignedTo,
    note: editAssignmentData.note,
    returnDate: editAssignmentData.returnDate,
    state: editAssignmentData.state,
    id: editAssignmentData.id,
  });
  const originData = {
    acceptedBy: editAssignmentData.acceptedBy,
    assetCode: editAssignmentData.assetCode,
    assignedBy: editAssignmentData.assignedBy,
    assignedDate: editAssignmentData.assignedDate,
    assignedTo: editAssignmentData.assignedTo,
    note: editAssignmentData.note,
    returnDate: editAssignmentData.returnDate,
    state: editAssignmentData.state,
    id: editAssignmentData.id,
  };
  useEffect(
    () => {
      const locationCode = localStorage.getItem("locationCode");
      const userNode = {
        locationCode: locationCode,
        username: editAssignmentData.assignedTo,
      };
      productApi.getAllUser(userNode).then((res) => {
        setUserList(res.data);
        setUserSearch(res.data);
      });
      const assetNode = {
        locationCode: locationCode,
        assetCode: ""
      };
      productApi.getAllAsset(assetNode).then((res) => {
        setAssetList(res.data.filter((item) => item.state === "Available"));
        setAssetSearch(res.data.filter((item) => item.state === "Available"));
      });
      productApi
        .getUserByUsername(editAssignmentData.assignedTo)
        .then((res) => {
          setAssignedTo(res.data);
        });
      productApi
        .getAssetByAssetCode(editAssignmentData.assetCode)
        .then((res) => {
          setAssignedAsset(res.data);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* Handle datepicker */
  const [startDate, setStartDate] = useState();
  const [minDate, setMinDate] = useState();
  const [showButton, setShowButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  function handleDateChange(date) {
    if (date !== null) {
      setShowButton(true);
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
      var year = date.getFullYear();
      console.log("Year: " + year);
      var dateString = day + "/" + month + "/" + year;
      setEditedData({ ...editedData, assignedDate: dateString });
    } else {
      setShowButton(false);
      setStartDate();
      setEditedData({
        ...editedData,
        assignedDate: editAssignmentData.assignedDate,
      });
    }
  }

  /* Handle datatable */
  const [showUserDataTable, setShowUserDataTable] = useState(false);
  const [showAssetDataTable, setShowAssetDataTable] = useState(false);
  const mapDate = (date) => {
    if (date !== null) {
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
      var year = date.getFullYear();
      console.log("Year: " + year);
      var dateString = day + "/" + month + "/" + year;
      return dateString;
    } else {
      return "";
    }
  }
  const userColumns = [
    {
      name: "Staff Code",
      selector: (row) => row.staffCode,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
      omit: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.lastName + " " + row.firstName,
      sortable: true,
    },
    {
      name: "Birthdate",
      selector: (row) => row.birthDate,
      sortable: true,
      omit: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      omit: true,
    },
    {
      name: "Location",
      selector: (row) => row.location.locationName,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.authority.authority,
      sortable: true,
    },
  ];

  const assetColumns = [
    {
      name: "Asset code",
      selector: (row) => row.assetCode,
      sortable: true,
    },
    {
      name: "Asset name",
      selector: (row) => row.assetName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
    },
    {
      name: "Specification",
      selector: (row) => row.specification,
      sortable: true,
      omit: true,
    },
    {
      name: "Installed date",
      selector: (row) => mapDate(new Date(row.installedDate)),
      sortable: true,
      omit: false,
    },
  ];

  //Handle button click
  let navigate = useNavigate();
  const handleTurnBack = () => {
    navigate("/manageassignments");
  };
  const toastSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })};
  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })};
  const handleSaveEdit = () => {
    if (JSON.stringify(editedData) !== JSON.stringify(originData)) {
      setEditedData({ ...editedData, assignedBy: localStorage.getItem("username") });
      productApi.saveEditedAssignment(editedData).then((res) => {
        if (res.status === 418) {
          toastError("Asset is not available");
        }
        if (res.status === 200) {
          localStorage.setItem("assignmentId", editedData.id);
          toastSuccess("Edit assignment successfully");
          navigate("/manageassignments");
        }
      });
    } else {
      toastError("No changes made");
    };
  };
  const errorTheSame = validateTheSame(editedData, originData);
  const [changed, setChanged] = useState(false);
  const noteErrorMessage = validateAssignmentNote(editedData.note);

  //Handle search
  const handleUserSearch = (value) => {
    setUserSearch(
      userList.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const handleAssetSearch = (value) => {
    setAssetSearch(
      assetList.filter(
        (asset) =>
          asset.assetCode.toLowerCase().includes(value.toLowerCase()) ||
          asset.assetName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="rookie-container">
      {showUserDataTable ? (
        /* DataTable for user */
        <div className="dhv-edit-assignment-datatable-user">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Type to find user"
              onChange={(e) => {
                handleUserSearch(e.target.value);
              }}
            />
          </InputGroup>

          <DataTable
            columns={userColumns}
            data={userSearch}
            noHeader
            // selectableRows={true}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
            pointerOnHover
            onRowClicked={(row) => {
              setEditedData({ ...editedData, assignedTo: row.username });
              setAssignedTo(row);
              setShowUserDataTable(false);
            }}
          />
        </div>
      ) : null}
      {showAssetDataTable ? (
        /* DataTable for asset */
        <div className="dhv-edit-assignment-datatable-asset">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Type to find asset"
              onChange={(e) => {
                handleAssetSearch(e.target.value);
              }}
            />
          </InputGroup>

          <DataTable
            columns={assetColumns}
            data={assetSearch}
            noHeader
            // selectableRows={true}
            defaultSortField="assetCode"
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
            pointerOnHover
            onRowClicked={(row) => {
              console.log(row.installedDate);
              setMinDate(new Date(row.installedDate));
              setEditedData({ ...editedData, assetCode: row.assetCode });
              setAssignedAsset(row);
              setShowAssetDataTable(false);
            }}
          />
        </div>
      ) : null}

      {/* Main content */}
      <div className="dhv-edit-assignment">
        <div id="dhv-edit-assignment-header">Edit Assignment</div>
        <div className="dhv-edit-assignment-body">
          <div className="dhv-edit-assignment-body-user">
            <div className="dhv-edit-assignment-body-user-label">User</div>
            <div className="dhv-edit-assignment-body-dropbox">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dhv-dropdown-basic"
                  onClick={() => {
                    setShowUserDataTable(!showUserDataTable);
                    setUserSearch(userList);
                  }}
                  onChange={(e) => {setChanged(true)}}
                >
                  {assignedTo.lastName + " " + assignedTo.firstName}
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </div>
          <div className="dhv-edit-assignment-body-asset">
            <div className="dhv-edit-assignment-body-asset-label">Asset</div>
            <div className="dhv-edit-assignment-body-dropbox">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dhv-dropdown-basic"
                  onClick={() => {
                    setShowAssetDataTable(!showAssetDataTable);
                    setAssetSearch(assetList);
                  }}
                  onChange={(e) => {setChanged(true)}}
                >
                  {assignedAsset.assetName}
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </div>
          <div className="dhv-edit-assignment-body-date">
            <div className="dhv-edit-assignment-body-date-label">
              Assigned Date
            </div>
            <div className="dhv-edit-assignment-body-date-datepicker" onContextMenu={(e)=>e.preventDefault()}>
              <DatePicker
                disabled
                id={
                  showButton
                    ? "dhv-edit-assignment-datepicker-input-with-button"
                    : "dhv-edit-assignment-datepicker-input"
                }
                minDate={minDate}
                onClickOutside={() => {
                  setShowDatePicker(false);
                }}
                dateFormat="dd/MM/yyyy"
                open={showDatePicker}
                showMonthDropdown
                showYearDropdown
                peekNextMonth
                dropdownMode="select"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off"
                placeholderText={editAssignmentData.assignedDate}
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  handleDateChange(date);
                  setShowDatePicker(false);
                  setChanged(true);
                }}
              />
              {showButton ? (
                <div
                  id="dhv-edit-assignment-body-date-datepicker-close-button"
                  onClick={() => {
                    handleDateChange(null);
                    setShowButton(false);
                    setShowDatePicker(false);
                  }}
                >
                  <GrClose />
                </div>
              ) : null}
              <div
                id="dhv-edit-assignment-body-date-datepicker-calendar"
                onClick={() => {
                  setStartDate(new Date());
                  setShowButton(true);
                  setShowDatePicker(true);
                  setChanged(true);
                }}
              >
                <AiTwotoneCalendar />
              </div>
            </div>
          </div>
          <div className="dhv-edit-assignment-body-note">
            <div className="dhv-edit-assignment-body-note-label">Note</div>
            <div className="dhv-edit-assignment-body-note-textarea">
              <InputGroup id="dhv-edit-assignment-body-note-textarea-input">
                <Form.Control
                  value={editedData.note}
                  as="textarea"
                  rows="4"
                  style={{
                    resize: "none",
                    border: "none",
                    highlightOnHover: "none",
                    borderRadius: "7px",
                  }}
                  onChange={(value) => {
                    setEditedData({ ...editedData, note: value.target.value });
                    setChanged(true);
                  }}
                  isInvalid={Boolean(noteErrorMessage)}
                />
              </InputGroup>
            </div>
          </div>
          <div id='dhv-edit-error-message'>{noteErrorMessage}</div>
          {(errorTheSame==="No change is made!" && changed) && <div id="dhv-edit-error-massage-2">No change is made!</div>}
          <div className="dhv-edit-assignment-body-button">
            <div>
              <button
                disabled={Boolean(noteErrorMessage)||JSON.stringify(editedData)===JSON.stringify(originData)}
                id="dhv-edit-assignment-body-button-save"
                onClick={() => {
                  console.log(editedData);
                  handleSaveEdit();
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                id="dhv-edit-assignment-body-button-cancel"
                onClick={() => {
                  handleTurnBack();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAssignment;
