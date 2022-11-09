import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import "../../Page.css"
import {
    validateBirthdate,
    validateJoinedDate,
    validateTheSame
} from "../../../components/validation/Validation";
import React from "react";
import { editUser } from "../utils/api";
import { toast } from "react-toastify";
import * as moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditUser.css"
import { GrClose } from "react-icons/gr";
import {AiTwotoneCalendar} from "react-icons/ai";
import {TIMEZONE} from "../../../constants";

const EditUser = () => {
    const [changed, setChanged] = useState(false);
    const [showButtonBirthdate, setShowButtonBirthdate] = useState(false);
    const [showButtonJoined, setShowButtonJoined] = useState(false);
    const [startJoinedDate, setStartJoinedDate] = useState();
    const [startBirthDate, setStartBirthDate] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location?.state;
    const username = user.username;
    const [checkMale, setCheckMale] = useState(() => {
        if (user.gender === "Male") {
            return true;
        }
        return false;
    });
    const [checkFemale, setCheckFemale] = useState(() => {
        if (user.gender === "Female") {
            return true;
        }
        return false;
    });
    const [values, setValues] = useState({
        dateOfBirth: user.birthDate,
        joinedDate: user.joinedDate,
        gender: user.gender,
        type: user.type
    })
    const [touched, setTouched] = useState({
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
        if (evt.target.value === "Male" && male === false) {
            setCheckFemale(!female)
            setCheckMale(!male)
        }
        if (evt.target.value === "Female" && female === false) {
            setCheckFemale(!female)
            setCheckMale(!male)
        }
        setChanged(true)
    }

    const handleBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        })

    }
    const handleSubmitFirst = () => {
        editUser(values, user.username).then((response) => {
            localStorage.setItem('theChosenOne', user.username)
            toast.success("Edit user success !", {
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

    const errorJoinedDate = validateJoinedDate(new Date(values.dateOfBirth), new Date(values.joinedDate))
    const errorDateOfBirth = validateBirthdate(new Date(values.dateOfBirth), new Date())
    const errorTheSame = validateTheSame(values, user)
    const formValid = !errorJoinedDate && !errorDateOfBirth && !errorTheSame
    // console.log("Birthdate: ", values.dateOfBirth)
    // console.log("Joined Date: ", values.joinedDate)
    // console.log("errorJoinedDate: ", errorJoinedDate)
    // console.log("errorBirthDate: ", errorDateOfBirth)
    // console.log("Same: ", errorTheSame)
    const handleBirthDateChange = (date) => {
        setChanged(true)
        if (date !== null) {
            setShowButtonBirthdate(true);
            setValues({ ...values, dateOfBirth: moment(date).format() })
        } else {
            setShowButtonBirthdate(false)
            setStartBirthDate();
            setValues({ ...values, dateOfBirth: moment(user.birthDate).format() })
        }
    }
    // document.addEventListener("contextmenu", (event) => {
    //     event.preventDefault();
    // });
    const handleJoinedDateChange = (date) => {
        setChanged(true)
        if (date !== null) {
            setShowButtonJoined(true);
            setValues({ ...values, joinedDate: moment(date).format() })
        } else {
            setShowButtonJoined(false)
            setStartJoinedDate();
            setValues({ ...values, joinedDate: moment(user.joinedDate).format() })
        }
    }
    return (
        <div className="rookie-container">
            <div className="nkq-edit-assignment-edit">
                <div id="nkq-edit-assignment-header-edit">Edit User</div>
                <Form validated={false}>

                    <div className="nkq-edit-assignment-body-edit">
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit">First Name</div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <p style={{fontSize: "18px" }}>{user.firstName}</p>
                            </div>
                        </div>
                        <div className="nkq-edit-assignment-body-asset-edit">
                            <div className="nkq-edit-assignment-body-asset-label-edit">Last Name</div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                <p style={{fontSize: "18px" }}>{user.lastName}</p>
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
                                    placeholderText={moment(user.birthDate).format("DD/MM/YYYY").toString()}
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
                                {(errorDateOfBirth === "User is under 18. Please select a different date" && changed) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>User is under 18. Please select a different date</p>}
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
                                    placeholderText={moment(user.joinedDate).format("DD/MM/YYYY").toString()}
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
                                        handleJoinedDateChange(new Date())
                                        setStartJoinedDate(new Date())
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
                                {(errorJoinedDate === "Joined date is Saturday or Sunday. Please select a different date" && changed) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>Joined date is Saturday or Sunday. Please select a different date</p>}
                                {(errorJoinedDate === "Joined date is not later than Date of Birth. Please select a different date" && changed) && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>Joined date is not later than Date of Birth. Please select a different date</p>}
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
                        <div className="nkq-edit-assignment-body-user-edit">
                            <div className="nkq-edit-assignment-body-user-label-edit"></div>
                            <div className="nkq-edit-assignment-body-dropbox-edit">
                                {(errorTheSame === "This is same as the old one !" && changed)  && <p style={{ color: "red", float: "left", maxWidth: "350px" }}>No change is made!</p>}
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

export default EditUser;
