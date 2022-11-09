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
import { useNavigate } from 'react-router-dom';
import { validateCategoryCode, validateFieldName, validateLengthMax, validateNotEmpty, validateState } from '../../../components/validation/Validation';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/index";
import moment from 'moment';

const CreateAsset = () => {
    const navigate = useNavigate();

    //store list of category to show in selection
    const [categories, setCategories] = useState([]);

    //store data input of user
    const [asset, setAsset] = useState({
        assetName: "",
        category: {
            categoryCode: "",
            categoryName: ""
        },
        specification: "",
        installedDate: "",
        state: "Available",
        location: { "locationCode": localStorage.locationCode }
    });

    const [touched, setTouched] = useState({
        assetName: false,
        category: false,
        specification: false,
        installedDate: false
    });

    // validate fields of new asset
    const errorAssetName = validateFieldName(asset.assetName, "assetName", 50);
    const errorCategory = validateCategoryCode(asset.category.categoryCode);
    const errorSpecification = validateLengthMax(asset.specification, "specification", 1500);
    const errorInstalledDate = validateNotEmpty(asset.installedDate, "installedDate");
    const errorState = validateState(asset.state, "state");
    const checkTouched = touched.assetName === true && touched.category === true && touched.installedDate === true
        && touched.specification === true;

    //check all validations to show Save button
    const validAll = !errorAssetName && !errorState && !errorInstalledDate && !errorSpecification && !errorCategory && checkTouched;

    //call api to get all category from database
    useEffect(() => {
        axios.get(`${API_URL}category/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                setCategories(response.data);
            })
    }, [])

    const handleBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        });     
    }
    //handle changes of all field in create asset screen
    const handleChange = (evt) => {

        if (evt.target.name === "category") {
            if (evt.target.value === "addNewCategory") {
                setShow(true);
                setCategory({
                    "categoryCode": "",
                    "categoryName": "",
                    "maxAssetCode": 0
                })
                setAddedCategory({
                    "categoryCode": "",
                    "categoryName": ""
                })
                setCategoryTouched({
                    categoryCode: false,
                    categoryName: false
                })
            } else {
                setAsset({
                    ...asset,
                    [evt.target.name]: { "categoryCode": evt.target.value }
                })
                setSelected(false);
            }
        } else
            setAsset({
                ...asset,
                [evt.target.name]: evt.target.value
            })       
    }

    //handle Save button to create new asset
    const handleSubmit = (evt) => {
        evt.preventDefault();       
        axios.post(`${API_URL}asset/create`, asset, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                toast.success("Create asset success !", {
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

    /****handle modal when create new category****/
    const [selected, setSelected] = useState(true);
    const [show, setShow] = useState(false);

    //store user's new category input 
    const [category, setCategory] = useState(
        {
            "categoryCode": "",
            "categoryName": "",
            "maxAssetCode": 0
        }
    );

    //store data of new created catogory to show first in list
    const [addedCategory, setAddedCategory] = useState({
        "categoryCode": "",
        "categoryName": ""
    });

    const [categoryTouched, setCategoryTouched] = useState({
        categoryCode: false,
        categoryName: false
    });

    //check code and name of category is unique
    const categoryCodeList = categories.map(category => category.categoryCode);
    const categoryNameList = categories.map(category => category.categoryName);
    const checkCategoryCode = categoryCodeList.includes(category.categoryCode);
    const checkCategoryName = categoryNameList.includes(category.categoryName);

    const errorCategoryCode = validateCategoryCode(category.categoryCode, "categoryCode", 3);
    const errorCategoryName = validateFieldName(category.categoryName, "categoryName", 50);
    const validAllCategory = !checkCategoryCode && !checkCategoryName && !errorCategoryCode && !errorCategoryName;
    const handleClose = () => {
        setShow(false);
        setSelected(true);
        setAsset({
            ...asset, category: addedCategory
        })       
        setCategoryTouched({
            categoryCode: false,
            categoryName: false
        })
    }
    const handleCategoryBlur = (evt) => {
        setCategoryTouched({
            ...categoryTouched,
            [evt.target.name]: true
        })
    }

    //handle changes in create category modal
    const handleCategoryChange = evt => {
        setCategory({
            ...category, [evt.target.name]: evt.target.value
        })
    }

    //handle Save button in create category modal
    const handleCategorySubmit = (evt) => {
        evt.preventDefault();
        axios.post(`${API_URL}category/create`, category, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                toast.success("Create category success !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAddedCategory(category);
                setShow(false);
                setSelected(true);
                setAsset({
                    ...asset, category: { "categoryCode": category.categoryCode, "categoryName": category.categoryName }
                })
                const newList = categories;
                newList.unshift(category);
                setCategories(newList);
            },
                (error) => {
                    toast.error("Create fail. Some things went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setShow(false)
                })
    }

    /* Handle datepicker */
    const [startDate, setStartDate] = useState();
    const [showButton, setShowButton] = useState(false);
    function handleDateChange(date) {
        if (date !== null) {
            setShowButton(true);
        } else {
            setShowButton(false);
            setStartDate();
        }
    }

    return (
        <div className='createAsset'>
            <div>
                <Form >
                    <h3 className="h3-createAsset">Create New Asset</h3>
                    <br></br>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={4}>
                            Name <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="assetName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder=""
                                maxLength="51"
                                tabIndex={1}
                            />
                            {asset.assetName.length === 0 && touched.assetName === true && <p className='valid-input-data'>This field is required</p>}
                            {asset.assetName.length > 50 && <p className='valid-input-data'>
                                Name cannot exceed 50 characters </p>}
                            {/* {errorAssetName === "Invalid special characters" && <p className='valid-input-data'>Invalid special characters</p>} */}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={4}>
                            Category <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select
                                value={selected ? addedCategory.categoryCode : null}
                                type="text"
                                name="category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                tabIndex={2}
                            >
                                <option value=""></option>
                                <option value="addNewCategory">Add new category</option>
                                {categories.map(category => (
                                    <option
                                        value={category.categoryCode}
                                        key={category.categoryCode}>{category.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                            {asset.category.categoryCode === "" && touched.category === true && <p className='valid-input-data'>This field is required</p>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={4}>
                            Specification <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control as="textarea"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="specification"
                                maxLength="1501"
                                rows={3}
                                tabIndex={3}
                            />
                            {asset.specification.length === 0 && touched.specification === true && <p className='valid-input-data'>This field is required</p>}
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
                                    tabIndex={4}
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
                                    //installedDate can't be future day
                                    maxDate={new Date()}
                                    name="installedDate"
                                    onBlur={handleBlur}
                                    onChange={(date) => {
                                        const iDate = moment(date).format("yyyy-MM-DD");                                        
                                        setAsset({ ...asset, "installedDate": iDate });                             
                                        setStartDate(date);
                                        handleDateChange(date);
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
                                        }}
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
                    {asset.installedDate === "" && touched.installedDate === true && <p className='valid-input-data requiredInstalledDate'>This field is required</p>}

                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
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
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row} >
                        <Col className="submitField" sm={{ span: 12, offset: 0 }}>
                            <Button
                                className="saveButton"
                                type="submit"
                                disabled={!validAll}
                                onClick={handleSubmit}
                            >Save</Button>
                            <Button
                                className="cancelButton"
                                onMouseDown={() => {
                                    navigate("/manageassets")
                                }}
                            >Cancel</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: "#cc2239" }}>Create new category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Prefix *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="categoryCode"
                                    onChange={handleCategoryChange}
                                    maxLength="4"
                                    onBlur={handleCategoryBlur}
                                />
                                {category.categoryCode.length === 0 && categoryTouched.categoryCode === true && <p className='valid-input-data'>This field is required</p>}
                                {checkCategoryCode && <p className='valid-input-data'>Category Code is already existed.
                                    Please enter a different category code</p>}
                                {category.categoryCode.length > 3 && <p className='valid-input-data'>Category Code cannot exceed 3 characters</p>}
                                {errorCategoryCode === "Invalid special characters" && <p className='valid-input-data'>Invalid special characters</p>}
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>New Category Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="categoryName"
                                    onChange={handleCategoryChange}
                                    maxLength="51"
                                    onBlur={handleCategoryBlur}
                                />
                                {category.categoryName.length === 0 && categoryTouched.categoryName === true && <p className='valid-input-data'>This field is required</p>}
                                {checkCategoryName && <p className='valid-input-data'>Category Name is already existed.
                                    Please enter a different category code</p>}
                                {category.categoryName.length > 50 && <p className='valid-input-data'>Category Name cannot exceed 50 characters</p>}
                                {/* {errorCategoryName === "Invalid special characters" && <p className='valid-input-data'>Invalid special characters</p>} */}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" disabled={!validAllCategory} className='saveButton' onClick={handleCategorySubmit}>
                            Save
                        </Button>
                        <Button variant="primary" type="submit" className='cancelButton' onMouseDown={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default CreateAsset;
