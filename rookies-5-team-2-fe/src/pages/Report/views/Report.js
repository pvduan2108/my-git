import React from "react";
import { useEffect } from "react";
import {useState} from "react";
import {getReport} from "../utils/reportApi";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import "./Report.css"
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {downloadCSV, downloadXLSX} from "../utils/ExportFunction";
import moment from "moment";
const Report = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState([]);
  useEffect(() => {
    let disCancel = false;
    setLoading(true);
    //Xu ly api tra ve
    getReport()
        .then((response) => {
          if (!disCancel) {
            setLoading(false);
            setReport(response);
          }
          setLoading(false);
        })
        .catch((error) => {
          if (!disCancel) {
            setLoading(false);
          }
          setLoading(false);
        });
    return () => {
      disCancel = true;
    };
  }, []);
  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      center: true,
    },
    {
      name: "Assigned",
      selector: (row) => row.assigned,
      sortable: true,
      center: true,
    },
    {
      name: "Available",
      selector: (row) => row.available,
      sortable: true,
      center: true,
    },
    {
      name: "Not available",
      selector: (row) => row.notAvailable,
      sortable: true,
      center: true,
    },
    {
      name: "Waiting for recycling",
      selector: (row) => row.waitingForRecycling,
      sortable: true,
      center: true,
    },
    {
      name: "Recycled",
      selector: (row) => row.recycled,
      sortable: true,
      center: true,
    },
  ];
  const getDownArrow = () => {
    return <i className="fa-solid fa-caret-down"></i>;
  };

  const exportDataXLSX = () => {
    downloadXLSX(report);
  }
  const exportDataCSV = () => {
    downloadCSV({ filename: `Report-${moment(new Date()).format("DD-MM-YYYY")}.csv` }, report);
  }
  return (
    <div className="rookie-container">
      <div className="main">
        <div className="Table-Extension">
          <div className="nkq-page-header-title">
            <>Report</>
          </div>
        </div>
        <DropdownButton variant="secondary-edit" title={"Export"} style={{float:"right", marginRight:"20px"}}>
          <Dropdown.Item onClick={exportDataCSV}><i className="fa-solid fa-file-csv"></i> CSV</Dropdown.Item>
          <Dropdown.Item onClick={exportDataXLSX}><i className="fa-solid fa-file-excel"></i> XLSX</Dropdown.Item>
        </DropdownButton>
        <br/><br/><br/>
        <DataTable
            noHeader
            columns={columns}
            data={report}
            defaultSortField="id"
            sortIcon={getDownArrow()}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
        />
      </div>
    </div>
  );
};
export default Report;
