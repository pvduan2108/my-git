import React, { useEffect, useState } from "react";
import { GrClose, GrFormCheckmark, GrFormClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "../ManageAssignment/Assignment.css";
import "./RequestForReturning.css";
import { ASSIGNMENTSTATE_COM, ASSIGNMENTSTATE_WFR } from "../../constants";
import DataTable from "react-data-table-component";
import { dateToString, mapState } from "./utils";
import { api_getAll, api_completeById, api_cancelById } from "./api";
import YesNoModal from "../../components/YesNoModal";
import { toast } from "react-toastify";

export const AbstractBtn = (props) => {
  return (
    <button id={props.id} disabled={props.onDisabled} onClick={props.handleOnClick} title={props.title}>{props.icon}</button>
  )
}

const RequestForReturning = () => {

  const token = localStorage.getItem("token");

  const username = localStorage.getItem("username");

  const locationCode = localStorage.getItem("locationCode");

  const [list, setList] = useState([]);
  const [config, setConfig] = useState({
    "locationCode": locationCode,
    "state": null,
    "search": null,
    "returnDate": null
  })

  const [stateText, setStateText] = useState("State");

  const [date, setDate] = useState(null);

  const [showButtonClear, setShowButtonClear] = useState();

  const [searchTerm, setSearchTerm] = useState();

  const [showAcceptMd, setShowAcceptMd] = useState(false);

  const [showCancelMd, setShowCancelMd] = useState(false);

  const [requestId, setRequestId] = useState();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCloseAcceptMd = () => {
    setShowAcceptMd(false);
    setRequestId(null);
  }

  const handleShowAcceptMd = (id) => {
    setShowAcceptMd(true);
    setRequestId(id);
  }

  const handleCloseCancelMd = () => {
    setShowCancelMd(false);
    setRequestId(null);
  }

  const handleShowCancelMd = (id) => {
    setShowCancelMd(true);
    setRequestId(id);
  }

  const stateOptions = [
    { value: null, label: "State" },
    { value: ASSIGNMENTSTATE_WFR, label: "Waiting for Returning" },
    { value: ASSIGNMENTSTATE_COM, label: "Completed" },
  ];

  const columns = [
    {
      name: 'No.',
      selector: row => row.id,
      sortable: true,
      width: "8%",
      wrap: true,
    },
    {
      name: 'Asset Code',
      selector: row => row.assetCode,
      sortable: true,
      width: "10%",
      wrap: true,
    },
    {
      name: 'Asset Name',
      selector: row => row.assetName,
      sortable: true,
      width: "11%",
      wrap: true,
    },
    {
      name: 'Requested by',
      selector: row => row.requestedBy,
      sortable: true,
      width: "12%",
      wrap: true,
    },
    {
      name: 'Assigned Date',
      selector: row => row.assignedDate,
      sortable: true,
      width: "12%",
      wrap: true,
    },
    {
      name: 'Accepted by',
      selector: row => row.acceptedBy,
      sortable: true,
      width: "12%",
      wrap: true,
    },
    {
      name: 'Returned Date',
      selector: row => row.returnDate,
      sortable: true,
      width: "12%",
      wrap: true,
    },
    {
      name: 'State',
      selector: row => mapState(row.state),
      sortable: true,
      width: "11%",
      wrap: true,
    },
    {
      name: "Action",
      selector: row => <>
        <AbstractBtn
          id="accept-btn"
          title="Accept request"
          onDisabled={row.state === ASSIGNMENTSTATE_COM}
          handleOnClick={() => handleShowAcceptMd(row.id)}
          icon={<GrFormCheckmark />}
        />
        <AbstractBtn
          id="cancel-btn"
          title="Cancel request"
          onDisabled={row.state === ASSIGNMENTSTATE_COM}
          handleOnClick={() => handleShowCancelMd(row.id)}
          icon={<GrFormClose />}
        />
      </>,
      sortable: false,
      width: "11%",
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await api_getAll(config, token);
      setList(data);
    })();
  }, [config, token]);

  const onStateChange = (data) => {
    setConfig({ ...config, state: data });
  }

  const onDateChange = (data) => {
    setDate(data);
    setConfig({ ...config, returnDate: dateToString(data) });
  }

  const onSearchSubmit = (data) => {
    setConfig({ ...config, search: data ? data : null });
  }

  const onCompleteReturn = () => {
    let _today = dateToString(new Date());
    (async () => {
      const result = await api_completeById(requestId, username, _today, token);
      if (result != null) {
        setList(list.map(e => e.id === requestId ?
          result : e))
        toastSuccess("Complete return request successfully");
      } else {
        toastError("Error when completing return request");
      }
    })();
    handleCloseAcceptMd();
  }
  const onCancelReturn = () => {
    (async () => {
      const result = await api_cancelById(requestId, token);
      console.log(result);
      if (result === 200) {
        setList(list.filter(e => e.id !== requestId));
        toastSuccess("Cancel return request successfully");
      } else {
        toastError("Error when cancelling return request");
      }
    })();
    handleCloseCancelMd();
  }

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

  return (
    <div className="rookie-container">
      <YesNoModal
        show={showAcceptMd}
        handleClose={handleCloseAcceptMd}
        handleSubmit={onCompleteReturn}
        heading="Are you sure?"
        body="Do you want to mark this returning request as 'Completed'?"
        cancelText="No"
        submitText="Yes"
      />
      <YesNoModal
        show={showCancelMd}
        handleClose={handleCloseCancelMd}
        handleSubmit={onCancelReturn}
        heading="Are you sure?"
        body="Do you want to cancel this returning request?"
        cancelText="No"
        submitText="Yes"
      />
      <div className="dhv-page-header">
        <div className="dhv-page-header-title">
          <div id="dhv-page-header-title">Request List</div>
        </div>
        <div className="dhv-page-header-functions">
              <div className="hien-page-header-functions-state">
                <Dropdown as={ButtonGroup}>
                  <Button
                    variant="success"
                    onClick={() => {
                      setStateText(stateOptions[0].label);
                      onStateChange(stateOptions[0].value);
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
                        setStateText(stateOptions[1].label);
                        onStateChange(stateOptions[1].value);
                      }}
                    >
                      {stateOptions[1].label}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setStateText(stateOptions[2].label);
                        onStateChange(stateOptions[2].value);
                      }}
                    >
                      {stateOptions[2].label}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>         
              <div className="dhv-page-header-functions-datepicker" onContextMenu={(e) => e.preventDefault()}>
                <DatePicker
                  id={
                    showButtonClear
                      ? "dhv-page-header-functions-datepicker-input-with-button"
                      : "dhv-page-header-functions-datepicker-input"
                  }
                  open={showDatePicker}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Returned Date"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  autoComplete="off"
                  selected={date}
                  onChange={(date) => {
                    onDateChange(date);
                    setShowButtonClear(true);
                    setShowDatePicker(false);
                  }}
                />
                {showButtonClear ? (
                  <div
                    id="dhv-page-header-functions-datepicker-button"
                    onClick={() => {
                      onDateChange(null);
                      setShowButtonClear(false);
                      setDate();
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
                      setShowDatePicker(true);
                      setShowButtonClear(true);
                      setDate(new Date());
                    }}
                  />
                </div>
              </div>
              <div className="dhv-page-header-functions-search">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="dhv-page-header-functions-search-input"
                    placeholder="Type to search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    //we can use onKeyDown to filter right after pressing any key
                    onChange={(e) => {
                      setSearchTerm(e.target.value.toLowerCase().trim());
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSearchSubmit(searchTerm);
                      }
                    }}
                    maxLength="50"
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    type="submit"
                    onClick={() => {
                      onSearchSubmit(searchTerm);
                    }}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </div>
        </div>
      </div>
      <div className="dhv-react-data-table">
        <DataTable
          id="custom-data-table"
          columns={columns}
          data={list}
          defaultSortFieldId="id"
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense
          width="100%"
        />
      </div>
    </div>
  );
};
export default RequestForReturning;