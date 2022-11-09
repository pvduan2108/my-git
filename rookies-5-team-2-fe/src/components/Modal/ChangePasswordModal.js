import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Modal, NavDropdown } from "react-bootstrap";
import "./Logout.css"
import { confirmTheSame, newPassword, oldPassword } from "../validation/Validation";
import React from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import "./ChangePassword.css"
const LogoutModal = () => {
    const [eye1, seteye1] = useState(false);
    const [password1, setpassword1] = useState("password");
    const [type1, settype1] = useState(true);
    const Eye1 = () => {
        if (password1 === "password") {
            setpassword1("text");
            seteye1(false);
            settype1(true);
        }
        else {
            setpassword1("password");
            seteye1(true);
            settype1(false);
        }
    }
    const [eye2, seteye2] = useState(false);
    const [password2, setpassword2] = useState("password");
    const [type2, settype2] = useState(true);
    const Eye2 = () => {
        if (password2 === "password") {
            setpassword2("text");
            seteye2(false);
            settype2(true);
        }
        else {
            setpassword2("password");
            seteye2(true);
            settype2(false);
        }
    }
    const [eye3, seteye3] = useState(false);
    const [password3, setpassword3] = useState("password");
    const [type3, settype3] = useState(true);
    const Eye3 = () => {
        if (password3 === "password") {
            setpassword3("text");
            seteye3(false);
            settype3(true);
        }
        else {
            setpassword3("password");
            seteye3(true);
            settype3(false);
        }
    }
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [touched, setTouched] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    })
    const handleChange = evt => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    }
    const handleBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        })
    }
    const handleCopy = evt => {
        evt.preventDefault()
        return false;
    }
    const handlePaste = evt => {
        evt.preventDefault()
        return false;
    }
    const errorOld = oldPassword(values.oldPassword);
    const errorNew = newPassword(values.oldPassword, values.newPassword);
    const errorConfirmPassword = confirmTheSame(values.confirmPassword, values.newPassword)
    const formValid = !errorNew && !errorOld && !errorConfirmPassword
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleClose();
        console.log("come to submit")
        axios.post(`${API_URL}changeoption`,
            { "username": `${localStorage.getItem("username")}`, "password": `${values.newPassword}` },
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).then(response => {
            console.log("success case")
            navigate("/")
            toast.success('Your password has been changed successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setShow(false)
            setValues({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
            setTouched({
                oldPassword: false,
                newPassword: false,
                confirmPassword: false
            })

            localStorage.removeItem('username');
            localStorage.removeItem('loginStatus');
            localStorage.removeItem('authority');
            localStorage.removeItem('firstTime');
            localStorage.removeItem('locationCode');
            localStorage.removeItem('mockPassword')
            navigate("/")
            window.location.reload();
            toast.success('You have logged out !', {
                icon:"🚀",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(function (error) {
            console.log("bad case")
            console.log(error)
        })
        setShow(false)
    }
    const handleClose = () => {
        setShow(false);
        setValues({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
        setTouched({
            oldPassword: false,
            newPassword: false,
            confirmPassword: false
        })
        seteye1(false)
        setpassword1("password")
        settype1(true)
        seteye2(false)
        setpassword2("password")
        settype2(true)
        seteye3(false)
        setpassword3("password")
        settype3(true)
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <NavDropdown.Item variant="outline-primary" onClick={handleShow}>
                Change password
            </NavDropdown.Item>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title style={{ color: "red", fontWeight: "bold" }}>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} validated={false}>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel controlId="floatingInput" label="Old password" datatype="password">
                                <Form.Control
                                    required
                                    name="oldPassword"
                                    value={values.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    //                                     onPaste={handlePaste}
                                    //                                     onCopy={handleCopy}
                                    type={type1 ? "password" : ""}
                                    placeholder="Enter Password"
                                    isValid={touched.oldPassword && !Boolean(errorOld)}
                                    isInvalid={touched.oldPassword && Boolean(errorOld)}
                                />
                                <i onClick={Eye1} className={`fa ${eye1 ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg"}`} style={{ position: "absolute", zIndex: "1", top: "1.7vw", left: "86%" }}></i>
                                <Form.Control.Feedback type="invalid">{errorOld}</Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Valid old password</Form.Control.Feedback>
                            </Form.FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel controlId="floatingInput" label="New password" datatype="password">
                                <Form.Control
                                    required
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    //                                     onPaste={handlePaste}
                                    //                                     onCopy={handleCopy}
                                    type={type2 ? "password" : ""}
                                    placeholder="Enter Password"
                                    isValid={touched.newPassword && !Boolean(errorNew)}
                                    isInvalid={touched.newPassword && Boolean(errorNew)}
                                />
                                <i onClick={Eye2} className={`fa ${eye2 ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg"}`} style={{ position: "absolute", zIndex: "1", top: "1.7vw", left: "86%" }}></i>
                                <Form.Control.Feedback type="invalid">{errorNew}</Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Valid new password</Form.Control.Feedback>
                            </Form.FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel controlId="floatingInput" label="Confirm New Password" datatype="password">
                                <Form.Control
                                    required
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onPaste={handlePaste}
                                    onCopy={handleCopy}
                                    type={type3 ? "password" : ""}
                                    placeholder="Enter Confirm Password"
                                    isValid={touched.confirmPassword && !Boolean(errorConfirmPassword)}
                                    isInvalid={touched.confirmPassword && Boolean(errorConfirmPassword)}
                                />
                                <i onClick={Eye3} className={`fa ${eye3 ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg"}`} style={{ position: "absolute", zIndex: "1", top: "1.7vw", left: "86%" }}></i>
                                <Form.Control.Feedback type="invalid">{errorConfirmPassword}</Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Valid Confirm Password</Form.Control.Feedback>
                            </Form.FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!formValid} variant="secondary-edit" onClick={handleSubmit} >
                        Save
                    </Button>
                    <Button variant="primary-edit" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default LogoutModal;
