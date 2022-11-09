import React from "react";
import { useEffect, useState } from "react"
import { API_URL } from "../../../constants";
// import axios from 'axios'
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import "react-data-table-component-extensions/dist/index.css";
import {deleteAsset, deleteAssetbyAssetCode, filterAsset, getCategory, getData, getAllData, getAsset} from "../utils/api"
import {Button, Col, Container, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import "../view/ManageAsset.css";
import { FaPen } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import YesNoModal from "../../../components/YesNoModal";
import ErrorModal from "./ErrorModal";
import { toast } from 'react-toastify';
import moment from "moment";

const ManageAssets = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const [error, setError] = useState("");
    const [assetListFull, setAssetsListFull] = useState([]);
  const [assetList, setAssetsList] = useState([]);
  const [backupAssetList, setBackupAssetsList] = useState([]);
  const [searchResult, setSearchResult] = useState(assetList);
  const [data, setData] = useState({data: []});
  const [dataAsset, setDataAsset] = useState({dataAss: []});
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [assetState, setAssetState] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [render, setRender] = useState(false);
  const [re, setRe] = useState(false);
    
//  console.log("locationcode: " + localStorage.getItem("locationCode"));
  useEffect(() => {
    let disCancel = false;
    setLoading(true);
    const objNodeAsset = {
      locationCode: localStorage.getItem("locationCode"),
      assetCode: localStorage.getItem("assetCode"),
    };
    console.log(objNodeAsset);
    getData(objNodeAsset)
      .then((response) => {
        if (!disCancel) {
          setLoading(false);
          setAssetsList(response);
          setBackupAssetsList(response);
          setSearchResult(response);
        }
        localStorage.removeItem("assetCode");
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
  }, [render]);

  useEffect(() => {
    let disCancel = false;
    setLoading(true);
    const objNodeAsset = {
      locationCode: localStorage.getItem("locationCode"),
      assetCode: localStorage.getItem("assetCode"),
    };
    console.log(objNodeAsset);
    getAllData(objNodeAsset)
      .then((response) => {
        if (!disCancel) {
          setLoading(false);
          setAssetsListFull(response);
          // setAssetsList(response);
          // setSearchResult(response);
        }
        localStorage.removeItem("assetCode");
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
  }, [render]);
  console.log("assetlist default:", assetList);
 console.log("assetlist full:", assetListFull);
  useEffect(() => {
    let disCancel = false;
    setLoading(true);
    getCategory()
      .then((response) => {
        if (!disCancel) {
          setLoading(false);
          setCategory(response);
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
  

useEffect(() => {
  setSearchResult(assetList.filter(
    (item) =>
    (item.assetCode.toLowerCase().includes(searchTerm) ||
    item.assetName.toLowerCase().includes(searchTerm) 
      ) &&
    item.category.categoryName.includes(assetCategory) &&
    item.state.toLowerCase().startsWith(assetState)
    ));
  }
, [searchTerm,assetCategory, assetState, assetList]);
const handleDelete = () => {
  setShowDeletePopup(true);
  

};

const cantDelete = () => {
  setShowErrorPopup(true);
};


const handleDeleteButton = () => {
  // var assetCode = localStorage.getItem('assetCode');
  console.log("Delete" + deteleByAssetCode);
  deleteAsset(deteleByAssetCode).then((res) => {
    toast.success("Delete asset success !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      } , 1000);
      // setSearchResult(assetList.filter((row)=> row.assetCode !== deteleByAssetCode));
    

  });
  setRender(true);
  // setRe(true);
  setShowDeletePopup(false);
}
const handleCancelButoon = () => {
  setShowDeletePopup(false);
};

const [deteleByAssetCode, setDeleteByAssetCode] = useState();


  /*state filter */
  const [stateText, setStateText] = useState("State");
  

/*category filter */
  const [categoryText, setCategoryText] = useState("Category");
  
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  
  const checkAvailable = () => {
    var assetCode = localStorage.getItem('assetCode');
    getAsset(assetCode).then((res) => {
      setDataAsset(res);
      console.log(res.data);
    });
  }
  
  // console.log(dataAsset);


        const columns = [
    {
      name: "Asset Code",
      selector: (row) => row.assetCode,
      sortable: true
    },
    {
      name: "Asset Name",
      selector: (row) => row.assetName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true
    },
    {
      name: "Action",
      sortable: false,
      selector: (row) => row.null,
      cell: (row, d) => [
<div>
          <button
            key={d.assetCode}
            onClick={() => {
              localStorage.setItem("editAssetData", JSON.stringify(row));
              navigate(`/edit_asset`);
            }}
            style={{ cursor: "pointer", color: "blue" }}
            className="dhv-action-icons"
            disabled={row.state.toLowerCase() === "assigned"}
          >
            <FaPen />
          </button>
          <button

            onMouseEnter={() => {
              localStorage.setItem('assetCode', row.assetCode)
              checkAvailable();
            }
          }
            onClick={() => {
              if(dataAsset.length === 0) {
                cantDelete();
              }else {
                handleDelete();
                setDeleteByAssetCode(row.assetCode);
                setRender(false)
                // setRe(false)
              }
              
            }}
            
            style={{ cursor: "pointer", color: "red",fontSize: "1.5em" }}
            className="dhv-action-icons"
            disabled={row.state.toLowerCase() === "assigned"}
          >
            <MdClear />
          </button>
          </div>,
      ],
    }
  ];
  console.log("render", render);


  function collapseString (str) { 
    if(str.length >10){
      return str.slice(0,9) + "...";
    }
    else return str;
  }


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem('assetCode');
  }
  const handleShow = () => setShow(true);

  const [rowData, setRowData] = useState({
    assetCode: "",
    assetName: "",
    category: "",
    state: "",
    installedDate:"",
  });
  
  const handleClick = async () => {
    setLoading(true);
    setData([]) 
    var assetCode = localStorage.getItem('assetCode');
    try {
      const response = await fetch(`${API_URL}assignments/asset_code=${assetCode}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
      localStorage.removeItem('assetCode');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (

    

    <>
    
    
    <Modal
      show={show}
      onHide={handleClose}
      data={rowData}
      size="lg"
      className="wth-assignment-details-modal"
      
    >
      <Modal.Header>
        <Modal.Title id="wth-assignment-details-header">
          Asset Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="wth-assignment-details-body">
          
          <div className="wth-assignment-details-body-row">
            <div className="wth-assignment-details-body-row-label">
              Asset code
            </div>
            <div className="wth-assignment-details-body-row-value">
              : {rowData.assetCode}
            </div>
          </div>
          <div className="wth-assignment-details-body-row">
            <div className="wth-assignment-details-body-row-label">
              Asset Name
            </div>
            <div className="wth-assignment-details-body-row-value">
              : {rowData.assetName}
            </div>
          </div>
          <div className="wth-assignment-details-body-row">
            <div className="wth-assignment-details-body-row-label">
              Category
            </div>
            <div className="wth-assignment-details-body-row-value">
              : {rowData.category.categoryName}
            </div>
          </div>
          <div className="wth-assignment-details-body-row">
            <div className="wth-assignment-details-body-row-label">
              Installed Date
            </div>
            <div className="wth-assignment-details-body-row-value">
              : {moment(rowData.installedDate).format('DD-MM-YYYY')}
            </div>
          </div>
          <div className="wth-assignment-details-body-row">
            <div className="wth-assignment-details-body-row-label">State</div>
            <div className="wth-assignment-details-body-row-value">
              : {rowData.state}
            </div>
          </div>

         
          

<div>
      {/*  check if array before calling `map()` */}
      <Table responsive="sm">
      <thead>
            <tr>
            
              <th>Assigned To</th>
              <th>Assigned By</th>
              <th>Assigned Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
      {Array.isArray(data)
        ? data.map(assignment => (
         
          
          <tbody>

            <tr key={assignment.id}>
              
              <td>{assignment.assignedBy}</td>
              <td>{assignment.assignedTo}</td>
              <td>{assignment.assignedDate}</td>
              <td>{assignment.returnDate}</td>
            </tr>

          </tbody>

          ))
        : null}
        </Table>

    </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>


    <div className="rookie-container">
        <div className="dhv-page-header-title">Asset List</div>
        <div className="main">

          {/* <div className="Table-Extension"> */}
          <div className="dhv-page-header-functions">
          <div className="dhv-page-header-functions-state">
          <Dropdown as={ButtonGroup}>
                    <Button
                      variant="success"
                      onClick={() => {
                         setStateText("State");
                         setAssetState("");
                         setAssetsList(backupAssetList);
                      } }
                    >
                      {stateText}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant="success"
                      id="dropdown-split-basic" />
                    <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => {
                          setStateText("Assigned");
                          setAssetState("assigned");
                        } }
                      >
                        Assigned
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setStateText("Available");
                          setAssetState("available");
                        } }
                      >
                        Available
                      </Dropdown.Item>
                      
                      <Dropdown.Item
                        onClick={() => {
                          setStateText("Not Available");
                          setAssetState("not available");
                        } }
                      >
                        Not Available
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {

                          setStateText("Waiting ...");

                          setAssetState("waiting for recycling");
                          setAssetsList(assetListFull);
                        } }
                      >
                        Waiting for recycling
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setStateText("Recycled");
                          setAssetState("recycled");
                          setAssetsList(assetListFull);
                        } }
                      >
                        Recycled
                      </Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
          </div>

          <div className="dhv-page-header-functions-state">
          <Dropdown as={ButtonGroup}>
                    <Button
                      variant="success"
                      onClick={() => {
                        setCategoryText("Category");
                        setAssetCategory("");
                        setAssetsList(backupAssetList);
                        console.log("current asset list: " + assetList);
                      } }
                    >
                      {categoryText}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant="success"
                      id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      {category.map(category => (
                                    <Dropdown.Item
                                    onClick={() => {                       
                                      setCategoryText(`${collapseString(category.categoryName)}`);
                                      setAssetCategory(`${category.categoryName}`);
                                      setAssetsList(assetListFull);
                                    } }
                                  >
                                    {category.categoryName}
                                  </Dropdown.Item>
                                ))}

                      
                    </Dropdown.Menu>
                  </Dropdown>
          </div>

          <div className="dhv-page-header-functions-search">
          <InputGroup className="mb-3">
                    <Form.Control
                      id="wth-page-header-functions-search-input"
                      placeholder="Type to search..."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      //we can use onKeyDown to filter right after pressing any key
                      onChange={(e) => {
                        setKeyword(e.target.value.toLowerCase().trim());
                        
                      } }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSearchTerm(keyword);
                          // setAssetsList(assetListFull);
                          if(keyword.trim().length ===0){
                            setAssetsList(backupAssetList);
                          }
                          else {
                            setAssetsList(assetListFull);
                          }
                        }
                      } } />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      type="submit"
                      onClick={() => {
                        setSearchTerm(keyword);
                        setAssetsList(assetListFull);
                      } }
                    >
                      <FaSearch />
                    </Button>
                  </InputGroup>
          </div>

          <div>
          <Button id="dhv-page-header-functions-create"  onClick={() => {
                                navigate("/create_asset");
                            }}>Create new asset</Button>{' '}
          </div>

          </div>
            



          <DataTable
            columns={columns}
            data={searchResult}
            onRowClicked={(row) => {
              setData([]) 
              setRowData(row);
              localStorage.setItem('assetCode', row.assetCode)
              handleClick();
              handleShow();

            }}
            noHeader
            defaultSortField="id"
            // sortIcon={<SortIcon />}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense />
        </div>
      </div>
      {showDeletePopup && <YesNoModal show={true} heading={"Are you sure?"} body={"Do you want to delete this asset?"} submitText={"Delete"} cancelText={"Cancel"} handleClose={handleCancelButoon} handleSubmit={handleDeleteButton}/> }
      <ErrorModal show={showErrorPopup} setShow={setShowErrorPopup}/>
      </>
  );

  
};
export default ManageAssets;