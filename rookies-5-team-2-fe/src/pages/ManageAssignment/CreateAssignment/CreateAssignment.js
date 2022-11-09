import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "react-datepicker";
import { InputGroup, Form } from "react-bootstrap";
import "./CreateAssignment.css";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import productApi from "../AssignmentAxios/ProductApi";
import { useNavigate } from "react-router-dom";
import { validateAssignmentNote } from "./Validation";
import { validateDate } from "./Validation";
import "./style.css";
import { toast } from "react-toastify";
// import { getAssignmentByAssetCode, updateAssignmentByAssetCode } from "../../ManageAsset/utils/api";
import { AiTwotoneCalendar } from "react-icons/ai";

const CreateAssignment = () => {

  //Handle data connection
  const [assignedTo, setAssignedTo] = useState({});
  const [assignedAsset, setAssignedAsset] = useState({});
  const [userSearch, setUserSearch] = useState([]);
  const [assetSearch, setAssetSearch] = useState([]);
  const [userList, setUserList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const createAssignmentData = {
    acceptedBy: "",
    assetCode: "PC000013",
    assignedBy: "quannk",
    assignedDate: "",
    assignedTo: "kiencq",
    requestedBy:"",
    id: 21,
    note: "",
    returnDate: "",
    state: "WAITING_FOR_ACCEPTANCE"
  };
  const assignedByAdmin = localStorage.getItem("username");

  const [editedData, setEditedData] = useState({
    acceptedBy: createAssignmentData.acceptedBy,
    assetCode: null,
    assignedBy: assignedByAdmin,
    assignedDate: createAssignmentData.assignedDate,
    assignedTo: null,
    requestedBy:"",
    note: "",
    returnDate: "",
    state: createAssignmentData.state,
    id: createAssignmentData.id,
  });

  useEffect(
    () => {
      const locationCode = localStorage.getItem("locationCode");
      const userNode = {
        locationCode: locationCode,
        username: createAssignmentData.assignedTo,
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* Handle datepicker */
  const [startDate, setStartDate] = useState();
  const [showButton, setShowButton] = useState(false);
  
  function handleDateChange(date) {
    if (date !== null) {
      setShowButton(true);
      var month = parseInt(date.getMonth().toString()) + 1;
      if(month < 10){
        month = "0" + month;
      }
      console.log("Month: " + month);
      var day = date.getDate();
      if(day<10){
        day = "0"+day;
      }
      console.log("Day: " + day);
      var year = date.getFullYear();
      console.log("Year: " + year);

      const testDate = validateDate(day, month, year);
      if(!testDate){
        setChanged3(false);
        toast.error("You must choose current date or a future date", {
          position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      } else{
        setChanged3(true);
      }
      var dateString = day+"/"+month+"/"+year;
      setEditedData({ ...editedData, assignedDate: dateString });
    } else {
      setShowButton(false);
      setStartDate();
      setEditedData({
        ...editedData,
        assignedDate: createAssignmentData.assignedDate,
      });
    }
  }

  /* Handle datatable */
  const [showUserDataTable, setShowUserDataTable] = useState(false);
  const [showAssetDataTable, setShowAssetDataTable] = useState(false);
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
      selector: (row) => row.installedDate,
      sortable: true,
      omit: true,
    },
  ];

  //Handle button click
  let navigate = useNavigate();
  const handleTurnBack = () => {
    navigate("/manageassignments");
  };
  const handleSaveCreate = () => {

    
    //setEditedData(...editedData, editedData.assignedDate = startDate);
    console.log(editedData);
    console.log("hi");
    console.log(startDate);
    const createData = {...editedData}
    productApi.createAssignment(createData).then((res) => {
      console.log("return data:");
      console.log(res);
      localStorage.setItem("assignmentId", res.data.id)
      if (res.status === 200) {
        toast.success("Create new assignment successfully !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
        navigate("/manageassignments");
    

    }).catch((err) => {
      toast.error("Bad request", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  })
  };
  const noteErrorMessage = validateAssignmentNote(editedData.note);

  //Handle search
  const handleUserSearch = (value) => {
    setUserSearch(
      userList.filter(
        (user) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase()) ||
          user.staffCode.toLowerCase().includes(value.toLowerCase()) 
      )
    );
  };
  const handleAssetSearch = (value) => {
    setAssetSearch(
      assetList.filter(
        (asset) =>
          asset.assetCode.toLowerCase().includes(value.toLowerCase()) ||
          asset.assetName.toLowerCase().includes(value.toLowerCase()) ||
          asset.assetCode.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const [changed1, setChanged1] = useState(false);
  const [changed2, setChanged2] = useState(false);
  const [changed3, setChanged3] = useState(false);
  const [changed4, setChanged4] = useState(false);
  return (
    <div className="rookie-container">
      {showUserDataTable ? (
        /* DataTable for user */
        <div className="laq-edit-assignment-datatable-user">
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
            defaultSortField="staffCode"
            defaultSortAsc={true}        
            pagination
            highlightOnHover
            dense
            onRowClicked={(row) => {
              setEditedData({ ...editedData, assignedTo: row.username });
              setAssignedTo(row);
              setShowUserDataTable(false);
              setChanged1(true);
            }}
          />
        </div>
      ) : null}
      {showAssetDataTable ? (
        /* DataTable for asset */
        <div className="laq-edit-assignment-datatable-asset">
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
            denser
            onRowClicked={(row) => {
              setEditedData({ ...editedData, assetCode: row.assetCode});
              setAssignedAsset(row);
              setShowAssetDataTable(false);
              setChanged2(true);
            }}
          />
        </div>
      ) : null}

      {/* Main content */}
      <div className="laq-edit-assignment">
        <div id="laq-edit-assignment-header">Create New Assignment</div>
        <div className="laq-edit-assignment-body">
          <div className="laq-edit-assignment-body-user">
            <div className="laq-edit-assignment-body-user-label">User</div>
            <div className="laq-edit-assignment-body-dropbox">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="laq-dropdown-basic"
                  onClick={() => {
                    setShowUserDataTable(!showUserDataTable);
                    setUserSearch(userList);
                  }}
                >
                  {
                     assignedTo.lastName ? (assignedTo.lastName + " " + assignedTo.firstName) : "Choose a user"
                    
                  }
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </div>
          <div className="laq-edit-assignment-body-asset">
            <div className="laq-edit-assignment-body-asset-label">Asset</div>
            <div className="laq-edit-assignment-body-dropbox">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="laq-dropdown-basic"
                  onClick={() => {
                    setShowAssetDataTable(!showAssetDataTable);
                    setAssetSearch(assetList);
                  }}
                >
                  {assignedAsset.assetName ? assignedAsset.assetName : "Choose an asset"}
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </div>
          <div className="laq-edit-assignment-body-date">
            <div className="laq-edit-assignment-body-date-label">
              Assigned Date
            </div>
            <div className="laq-edit-assignment-body-date-datepicker">
              <DatePicker
                id={
                  showButton
                    ? "laq-edit-assignment-datepicker-input-with-button"
                    : "laq-edit-assignment-datepicker-input"
                }
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                peekNextMonth
                dropdownMode="select"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off"
                placeholderText={new Date().toLocaleDateString()}
                selected={startDate}
                onChange={(date) => {
                    console.log(`hello ${date}`)
                  setStartDate(date);
                  handleDateChange(date);
                }}
              />
              {showButton ? (
                <div
                  id="laq-edit-assignment-body-date-datepicker-close-button"
                  onClick={() => {
                    handleDateChange(null);
                    setShowButton(false);
                    setChanged3(false);
                  }}
                >
                  <GrClose />
                </div>
              ) : null}
              <div
                id="laq-edit-assignment-body-date-datepicker-calendar"
                onClick={() => {
                  setStartDate(new Date());
                  setShowButton(true);
                  setChanged3(true);
                  handleDateChange(new Date());
                }}
              >
                  <AiTwotoneCalendar style={{height: '18px', with:'18px'}}/>
              </div>
            </div>
          </div>
          <div className="laq-edit-assignment-body-note">
            <div className="laq-edit-assignment-body-note-label">Note</div>
            <div className="laq-edit-assignment-body-note-textarea">
              <InputGroup id="laq-edit-assignment-body-note-textarea-input">
                <Form.Control
                  value={editedData.note}
                  as="textarea"
                  rows="4"
                  style={{ resize: "none" }}
                  onChange={(value) => {
                    setEditedData({ ...editedData, note: value.target.value });
                    setChanged4(true);
                  }}
                  isValid={!Boolean(noteErrorMessage)}
                  isInvalid={Boolean(noteErrorMessage)}
                />
                <Form.Control.Feedback type="invalid">{noteErrorMessage}</Form.Control.Feedback>
              </InputGroup>
            </div>
          </div>
          <div className="laq-edit-assignment-body-button">
            <div>
              <button 
                disabled={ !(changed1 && changed2 && changed3) }
                id={(changed1 && changed2 && changed3) ? "laq-edit-assignment-body-button-save-true" : "laq-edit-assignment-body-button-save-false"}
                onClick={() => {
                  console.log(editedData);
                  handleSaveCreate();
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                id="laq-edit-assignment-body-button-cancel"
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

export default CreateAssignment;
