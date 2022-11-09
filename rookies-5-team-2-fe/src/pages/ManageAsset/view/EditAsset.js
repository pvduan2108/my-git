import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { GrClose } from "react-icons/gr";
import { AiTwotoneCalendar } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import "../view/CreateAsset.css"
import { useNavigate, useParams } from 'react-router-dom';
import { validateFieldName, validateLengthMax, validateNotEmpty, validateState } from '../../../components/validation/Validation';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/index";
import moment from 'moment';

const EditAsset = () => {
  const navigate = useNavigate();
  const [haveChanged, setHaveChanged] = useState(false);
  const [category, setCategory] = useState("");
  const editAsset = JSON.parse(
    localStorage.getItem("editAssetData")
  );
  //store original data of asset
  const originalAsset = {
    assetCode: editAsset.assetCode,
    assetName: editAsset.assetName,
    // category: "",
    specification: editAsset.specification,
    installedDate: editAsset.installedDate,
    state: editAsset.state,
    location: editAsset.location
  };
  //store data of asset with changes
  const [asset, setAsset] = useState({
    assetCode: editAsset.assetCode,
    assetName: editAsset.assetName,
    category: editAsset.category,
    specification: editAsset.specification,
    installedDate: editAsset.installedDate,
    state: editAsset.state,
    location: editAsset.location
  });

  useEffect(() => {
    setStartDate(new Date(moment(editAsset.installedDate).format("yyyy-MM-DD")));
    setCategory(editAsset.category.categoryName);
  }, [])

  // validate fields of new asset
  const errorAssetName = validateFieldName(asset.assetName, "assetName", 50);
  const errorSpecification = validateLengthMax(asset.specification, "specification", 1500);
  const errorInstalledDate = validateNotEmpty(asset.installedDate, "installedDate");
  const errorState = validateState(asset.state, "state");
  const checkOrigin = (asset.assetName === originalAsset.assetName) && (asset.specification === originalAsset.specification)
    && (asset.installedDate === originalAsset.installedDate) && (asset.state === originalAsset.state);

  //check all validations to show Save button
  const validAll = !errorState && !errorInstalledDate && !errorSpecification && !errorAssetName
    && !checkOrigin;

  //handle changes of all field in eidt asset screen
  const handleChange = (evt) => {
    setHaveChanged(true);
    setAsset({
      ...asset,
      [evt.target.name]: evt.target.value
    })
  }

  //handle Save button to edit asset
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.put(`${API_URL}asset/${asset.assetCode}`, asset, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        toast.success("Update asset success !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem('assetCode', response.data.assetCode);
        navigate("/manageassets")
      },
        (error) => {
          toast.error("Bad request", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
  }

  /* Handle datepicker icon */
  const [startDate, setStartDate] = useState();
  const [showButton, setShowButton] = useState(true);
  function handleDateChange(date) {
    if (date !== null) {
      setShowButton(true);
    } else {
      setShowButton(false);
      setStartDate();
    }
  }

  return (
    <div className='editAsset'>
      <div>
        <Form >
          <h3 className="h3-editAsset">Edit Asset</h3>
          <br></br>
          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm={4}>
              Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm={8} className="editAsset_input">
              <Form.Control
                type="text"
                name="assetName"
                onChange={handleChange}
                placeholder=""
                maxLength="51"
                value={asset.assetName}
                tabIndex={1}
              />
              {asset.assetName.length === 0 && <p className='valid-input-data'>This field is required</p>}
              {asset.assetName.length > 50 && <p className='valid-input-data'>Name cannot exceed 50 characters </p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm={4}>
              Category <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm={8} className="editAsset_input">
              <Form.Select
                type="text"
                name="category"
                disabled
              >
                <option selected={category} value="" >{category}</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm={4}>
              Specification <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm={8} className="editAsset_input">
              <Form.Control as="textarea"
                onChange={handleChange}
                name="specification"
                maxLength="1501"
                value={asset.specification}
                tabIndex={2}
              />
              {asset.specification.length === 0 && <p className='valid-input-data'>This field is required</p>}
              {errorSpecification !== "" && <p className='valid-input-data'>Specification cannot exceed 1500 characters</p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Installed Date <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm={8}>
              <label sm={8} className="col-sm-8 installedDate-datepicker" onContextMenu={(e) => e.preventDefault()}
              >
                <DatePicker
                  tabIndex={3}
                  id={
                    showButton
                      ? "installedDate-datepicker-input-with-button"
                      : "installedDate-datepicker-input"
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
                  placeholderText=""
                  selected={startDate}
                  maxDate={new Date()}
                  name="installedDate"
                  onChange={(date) => {
                    const iDate = moment(date).format("yyyy-MM-DD");
                    setAsset({ ...asset, "installedDate": iDate });
                    setStartDate(date);
                    handleDateChange(date);
                    setHaveChanged(true);
                  }}
                  value={startDate}
                />
                {showButton ? (
                  <div
                    id="installedDate-datepicker-close-button"
                    onClick={() => {
                      handleDateChange(null);
                      setShowButton(false);
                      setAsset({
                        ...asset,
                        installedDate: ""
                      })
                    }
                    }
                  >
                    <GrClose />
                  </div>
                ) : null}
                <div
                  id="installedDate-datepicker-calendar"
                  onClick={() => {
                    setShowButton(true);
                  }}
                >
                  <AiTwotoneCalendar />
                </div>
              </label>
            </Col>
          </Form.Group>
          {asset.installedDate === "" && <p className='valid-input-data requiredInstalledDate'>This field is required</p>}

          <fieldset>
            <Form.Group as={Row} className="mb-3" >
              <Form.Label as="legend" column sm={4}>
                State <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm={8} >
                <Form.Check
                  type="radio"
                  label="Available"
                  name="state"
                  value="Available"
                  onChange={handleChange}
                  checked={asset.state === "Available"}
                />
                <Form.Check
                  type="radio"
                  label="Not Available"
                  name="state"
                  value="Not Available"
                  onChange={handleChange}
                  checked={asset.state === "Not Available"}
                />
                <Form.Check
                  type="radio"
                  label="Waiting for Recycling"
                  name="state"
                  value="Waiting for Recycling"
                  onChange={handleChange}
                  checked={asset.state === "Waiting for Recycling"}
                />
                <Form.Check
                  type="radio"
                  label="Recycled"
                  name="state"
                  value="Recycled"
                  onChange={handleChange}
                  checked={asset.state === "Recycled"}
                />
              </Col>
            </Form.Group>
          </fieldset>
          {checkOrigin && haveChanged === true && <p className='valid-input-data'>No change is made!</p>}

          <Form.Group as={Row} >
            <Col className="submitField" sm={{ span: 10, offset: 2 }}>
              <Button
                className="saveButton"
                type="submit"
                disabled={!validAll}
                onClick={handleSubmit}
              >Save</Button>
              <Button className="cancelButton" type="submit" onClick={() => {
                navigate("/manageassets")
              }}>Cancel</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default EditAsset;
