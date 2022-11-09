import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {Button,Form, FormGroup} from "react-bootstrap";
import "../../Page.css"
import {
    removeSpace,
    trimString,
    validateBirthdate, validateFirstName,
    validateJoinedDate, validateLastName
} from "../../../components/validation/Validation";
import React from "react";
import {createUser} from "../utils/api";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditUser.css"
import { GrClose } from "react-icons/gr";
import {AiTwotoneCalendar} from "react-icons/ai";

const CreateNewUser = () => {
    const [changedDOB, setChangedDOB] = useState(false);
    const [changedJD, setChangedJD] = useState(false);
    const [showButtonBirthdate, setShowButtonBirthdate] = useState(false);
    const [showButtonJoined, setShowButtonJoined] = useState(false);
    const [startJoinedDate, setStartJoinedDate] = useState();
    const [startBirthDate, setStartBirthDate] = useState();
    const [checkMale, setCheckMale] = useState(false)
    const [checkFemale, setCheckFemale] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        joinedDate: null,
        gender: "Female",
        type: "ADMIN"
    })
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        joinedDate: false,
        gender: false,
        type: false
    })
    const handleChange = evt => {
        let male = checkMale;
        let female = checkFemale;
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
        if (evt.target.name === "firstName") {
            setValues({...values, firstName: evt.target.value.trim()})
        }
        if (evt.target.value === "Male" && male === false) {
            setCheckFemale(!female)
            setCheckMale(!male)
        }
        if (evt.target.value === "Female" && female === false) {
            setCheckFemale(!female)
            setCheckMale(!male)
        }
    }

    const handleBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        })

        setValues({...values, lastName: trimString(values.lastName).trim()})
    }

    const handleBlurFirstname = () => {
        setTouched({...touched, firstName: true})
        setValues({...values, firstName: removeSpace(values.firstName).trim()})
    }
    const handleSubmitFirst = () => {
        createUser(values).then((response) => {
            console.log(response?.username)
            localStorage.setItem('theChosenOne', response?.username)
            toast.success("Create new user success !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/manageusers", { replace: true });
            localStorage.setItem("changeListOnReload", "0");
        }).catch((err) => {
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

    const errorFirstName = validateFirstName(values.firstName)
    const errorLastName = validateLastName(values.lastName)
    const errorJoinedDate = validateJoinedDate(values.dateOfBirth, values.joinedDate)
    const errorDateOfBirth = validateBirthdate(values.dateOfBirth, new Date())
    const formValid = !errorJoinedDate && !errorDateOfBirth
    // console.log("Birthdate: ", values.dateOfBirth)
    // console.log("Joined Date: ", values.joinedDate)
    // console.log("errorJoinedDate: ", errorJoinedDate)
    // console.log("errorBirthDate: ", errorDateOfBirth)
    // console.log("Lastname: ", values.lastName.trim())
    const handleBirthDateChange = (date) => {
        setChangedDOB(true)
        if (date !== null) {
            setShowButtonBirthdate(true);
            setValues({ ...values, dateOfBirth: moment(date).format() })
        } else {
            setShowButtonBirthdate(false)
            setStartBirthDate();
            setValues({ ...values, dateOfBirth: null })
        }
    }
    const handleJoinedDateChange = (date) => {
        setChangedJD(true)
        if (date !== null) {
            setShowButtonJoined(true);
            setValues({ ...values, joinedDate: moment(date).format() })
        } else {
            setShowButtonJoined(false)
            setStartJoinedDate();
            setValues({ ...values, joinedDate: null })
        }
    }
    return (
        <div className="rookie-container">
            <div className="nkq-edit-assignment-edit">
                <div id="nkq-edit-assignment-header-edit">Create New User</div>
                <Form validated={false}>

                    <div className="nkq-edit-assignment-body-edit">
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit">First Name<span style={{ color: "red" }}>*</span></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <FormGroup className="mb-3">
                                        <Form.Control
                                            required
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlurFirstname}
                                            type="firstName"
                                            placeholder="Enter Firstname"
                                            isValid={touched.firstName && !Boolean(errorFirstName)}
                                            isInvalid={touched.firstName && Boolean(errorFirstName)}
                                        />
                                        <Form.Control.Feedback type="invalid">{errorFirstName}</Form.Control.Feedback>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-asset-edit">
                            <div className="nkq-edit-assignment-body-asset-label-edit">Last Name<span style={{ color: "red" }}>*</span></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <FormGroup className="mb-3">
                                        <Form.Control
                                            required
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="lastname"
                                            placeholder="Enter Lastname"
                                            isValid={touched.lastName && !Boolean(errorLastName)}
                                            isInvalid={touched.lastName && Boolean(errorLastName)}
                                        />
                                        <Form.Control.Feedback type="invalid">{errorLastName}</Form.Control.Feedback>

                                        {/*<Form.Control.Feedback type="valid">Username look goods</Form.Control.Feedback>*/}
                                </FormGroup>
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-date-edit">
                            <div className="nkq-edit-assignment-body-date-label-edit">
                                Date of Birth<span style={{ color: "red" }}>*</span>
                            </div>
                            <div className="nkq-edit-assignment-body-date-datepicker-edit" onContextMenu={(e) => e.preventDefault()}>
                                <DatePicker
                                    id={
                                        showButtonBirthdate
                                            ? "nkq-edit-assignment-datepicker-input-with-button-edit"
                                            : "nkq-edit-assignment-datepicker-input-edit"
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    maxDate={new Date()}
                                    autoComplete="off"
                                    // placeholderText={moment(startBirthDate).format("DD/MM/YYYY").toString()}
                                    selected={startBirthDate}
                                    onChange={(date) => {
                                        setStartBirthDate(date)
                                        handleBirthDateChange(date);
                                    }}

                                />
                                {showButtonBirthdate ? (
                                    <div
                                        id="nkq-edit-assignment-body-date-datepicker-close-button-edit"
                                        onClick={() => {
                                            handleBirthDateChange(null)
                                            setShowButtonBirthdate(false);
                                        }}
                                    >
                                        <GrClose />
                                    </div>
                                ) : null}
                                <div
                                    id="nkq-edit-assignment-body-date-datepicker-calendar-edit"
                                    onClick={() => {
                                        handleBirthDateChange(new Date())
                                        setStartBirthDate(new Date())
                                        setShowButtonBirthdate(true);
                                    }}
                                >
                                    <AiTwotoneCalendar />
                                </div>

                            </div>

                        </div>
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit"></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                {(errorDateOfBirth === "User is under 18. Please select a different date" && changedDOB) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>User is under 18. Please select a different date</p>}
                                {(errorDateOfBirth === "This field is required" && changedDOB) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>This field is required</p>}
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-asset-edit">
                            <div className="nkq-edit-assignment-body-asset-label-edit">Gender<span style={{ color: "red" }}>*</span></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <div
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gender}
                                >
                                    <Form.Check
                                        inline
                                        label="Female"
                                        value="Female"
                                        name="gender"
                                        checked={checkFemale}
                                    />
                                    <Form.Check
                                        inline
                                        label="Male"
                                        value="Male"
                                        name="gender"
                                        checked={checkMale}
                                    ></Form.Check>
                                </div>
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-date-edit">
                            <div className="nkq-edit-assignment-body-date-label-edit">
                                Joined Date<span style={{ color: "red" }}>*</span>
                            </div>
                            <div className="nkq-edit-assignment-body-date-datepicker-edit" onContextMenu={(e) => e.preventDefault()}>
                                <DatePicker
                                    id={
                                        showButtonJoined
                                            ? "nkq-edit-assignment-datepicker-input-with-button-edit"
                                            : "nkq-edit-assignment-datepicker-input-edit"
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    maxDate={new Date()}
                                    autoComplete="off"
                                    // placeholderText={moment(startJoinedDate).format("DD/MM/YYYY").toString()}
                                    selected={startJoinedDate}
                                    onChange={(date) => {
                                        setStartJoinedDate(date)
                                        handleJoinedDateChange(date)
                                    }}
                                />
                                {showButtonJoined ? (
                                    <div
                                        id="nkq-edit-assignment-body-date-datepicker-close-button-edit"
                                        onClick={() => {
                                            handleJoinedDateChange(null)
                                            setShowButtonJoined(false);
                                        }}
                                    >
                                        <GrClose />
                                    </div>
                                ) : null}
                                <div
                                    id="nkq-edit-assignment-body-date-datepicker-calendar-edit"
                                    onClick={() => {
                                        setStartJoinedDate(new Date())
                                        handleJoinedDateChange(new Date())
                                        setShowButtonJoined(true);
                                    }}
                                >
                                    <AiTwotoneCalendar />
                                </div>

                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit"></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                {(errorJoinedDate === "Joined date is Saturday or Sunday. Please select a different date" && changedJD) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>Joined date is Saturday or Sunday. Please select a different date</p>}
                                {(errorJoinedDate === "Joined date is not later than Date of Birth. Please select a different date" && changedJD) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>Joined date is not later than Date of Birth. Please select a different date</p>}
                                {(errorJoinedDate === "This field is required" && changedJD) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>This field is required</p>}
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit">Type<span style={{ color: "red" }}>*</span></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <Form.Select aria-label="Default select example" size="sm"
                                             value={values.type}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             name="type"
                                             style={{ marginTop: "8px" }}
                                >
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="STAFF">STAFF</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-button-edit">
                            <div>
                                <Button variant="secondary-edit" disabled={!formValid} onClick={handleSubmitFirst}>Save</Button>
                            </div>
                            <div>
                                <Button variant="primary-edit"
                                        onClick={() => {
                                            navigate("/manageusers")
                                        }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreateNewUser;
