import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import "./ManageUser.css";
import {checkDisableUser, filterUser, getData} from "../utils/api";
import * as moment from "moment-timezone"
import UserDetail from "../components/UserDetail";
import UserFilter from "../components/UserFilter";
import DisableUserModal from "../components/DisableUserModal";
import TypeFilter from "../components/TypeFilter";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ErrorModal from "../components/ErrorModal";
import {MdClear} from "react-icons/md";
import {TIMEZONE} from "../../../constants";
const ManageUsers = () => {
  const navigate = useNavigate();
  const getDownArrow = () => {
    return <i className="fa-solid fa-arrow-down "> </i>;
  };
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [filter, setFilter] = useState("");
  const [disableModal, setDisableModal] = useState(false);
  const [disableUser, setDisableUser] = useState("");
  const [type, setType] = useState("");
  const [stateText, setStateText] = useState("Type");
  if ( localStorage.getItem("changeListOnReload") === "1") {
    localStorage.removeItem("theChosenOne")
    localStorage.removeItem("changeListOnReload")
  }
  useEffect(() => {
    if (performance.navigation.type === 1 && localStorage.getItem("changeListOnReload") === "0") {
      localStorage.setItem("changeListOnReload", "1")
    }
    let disCancel = false;
    setLoading(true);
    //Xu ly api tra ve
    getData()
      .then((response) => {
        if (!disCancel) {
          setLoading(false);
          setUsers(response);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (!disCancel) {
          setLoading(false);
          setError("Something went wrong");
        }
        setLoading(false);
      });
    return () => {
      disCancel = true;
    };
  }, []);
  const column = [
    {
      name: "Staff Code",
      selector: (row) => row.staffCode,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
      cell: (row, index, column, id) => {
        return (
          <div>
            {row.fullName}
          </div>
        );
      },
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Joined Date",
      selector: (row) => row.joinedDate,
      sortable: true,
      cell: (row, index, column, id) => {
        return (
            <div>
              {moment(row.joinedDate).format("DD/MM/YYYY")}
            </div>
        );
      },
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      selector: (row) => row.null,
      cell: (row, d) => [
        <Link to={`/manageusers/${row.username}`} state={{ user: row }}><i
          key={d.title}
          className="first fas fa-pen"
          onClick={() => {localStorage.setItem("reloaded", "false");}}
        /></Link>
        ,
        <Link to={"#"} onClick={() => {
          checkDisableUser(row.username).then((response) => {
            setDisableUser(row.username);
            setDisableModal(true);
          }).catch(function (error) {
            setErrorModal(true);
          })

        }}
        style={{ cursor: "pointer", color: "red", fontSize: "1.5em" }}
        >
          <MdClear />
        </Link>
        ,
      ],
    },
  ];
  const handleClickRow = (row) => {
    setUserDetail(row);
    setShowModal(true);
  };
  const onFilter = (input, type) => {
    setLoading(true);
    filterUser(input, type)
      .then((response) => {
        setLoading(false);
        setUsers(response);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="rookie-container">
      <div className="main">
        <div className="Table-Extension">
          <div className="nkq-page-header-title">
            <>User List</>
          </div>
          <div className="nkq-page-header-functions">
            <div className="nkq-page-header-functions-state">
              <p style={{ lineHeight: "20px" }}></p>
              <TypeFilter filter={filter} setType={setType} onFilter={onFilter} type={type} stateText={stateText} setStateText={setStateText} />
            </div>
            <div className="nkq-page-header-functions-search">
              <UserFilter filter={filter} setFilter={setFilter} onFilter={onFilter} type={type} />
            </div>
            <div className="nkq-page-header-functions-search" style={{ marginLeft: "50px" }}>
              <Button className="btn-secondary-edit" style={{ marginTop: "15px" }} onClick={() => {
                navigate("/adduser");
              }}>Create new user</Button>{' '}
            </div>
          </div>
        </div>
        <DataTable
          columns={column}
          data={users}
          noHeader
          defaultSortField="id"
          // sortIcon={getDownArrow()}
          // sortIcon={GrFormDown}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense
          onRowClicked={(row, event) => handleClickRow(row)}
        />
      </div>
      {!!userDetail && <UserDetail show={showModal} setShow={setShowModal} user={userDetail} />}
      {!!disableUser && <DisableUserModal show={disableModal} setShow={setDisableModal} user={disableUser} />}
      <ErrorModal show={errorModal} setShow={setErrorModal}/>
    </div>
  );
};
export default ManageUsers;
