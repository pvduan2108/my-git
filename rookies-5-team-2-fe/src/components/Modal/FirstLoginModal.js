import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {confirmTheSame, validatePassword} from "../validation/Validation";
import {Form, Modal} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {API_URL} from "../../constants";
import "./FirstLogin.css"
import bcrypt from "bcryptjs";
const FirstLoginModal = () => {
    const saltRounds = 10;
    const[eye1,seteye1]=useState(false);
    const[password1,setpassword1]=useState("password");
    const[type1,settype1]=useState(true);
    const Eye1=()=>{
        if(password1=="password"){
            setpassword1("text");
            seteye1(false);
            settype1(true);
        }
        else{
            setpassword1("password");
            seteye1(true);
            settype1(false);
        }
    }
    const[eye2,seteye2]=useState(false);
    const[password2,setpassword2]=useState("password");
    const[type2,settype2]=useState(true);
    const Eye2=()=>{
        if(password2=="password"){
            setpassword2("text");
            seteye2(false);
            settype2(true);
        }
        else{
            setpassword2("password");
            seteye2(true);
            settype2(false);
        }
    }
    const navigate = useNavigate();
    const [values, setValues] = useState({
        password: "",
        confirmPassword:""
    });
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    })
    const handleCopy = evt =>{
        evt.preventDefault()
        return false;
    }
    const handlePaste = evt =>{
        evt.preventDefault()
        return false;
    }
    const [show, setShow] = useState(true);
    if (localStorage.getItem("firstTime") === "1" && localStorage.getItem("username") !== null) {
        const errorPassword = validatePassword(values.password);
        const errorConfirmPassword = confirmTheSame(values.password, values.confirmPassword);
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

        const handleSubmit = () => {
            handleClose();
            localStorage.setItem("firstTime", "0");
            axios.post(`${API_URL}change`,{"username":`${localStorage.getItem("username")}`,"password" : `${values.password}`},
                {headers: {"Content-Type": "application/json", "Authorization":`Bearer ${localStorage.getItem('token')}` }}
            ).then(response => {
                navigate("/")
                toast.success('Change password success !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem('mockPassword', bcrypt.hashSync(values.password, saltRounds))
                setShow(false);
            }).catch(function (error) {
                console.log(error)
                navigate("/")
            })
            setShow(false);
        }
        const handleClose = () => setShow(false);
        const formValid = !errorPassword && !errorConfirmPassword;
        return (
            <>
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title style={{color:"red", fontWeight:"bold"}}>Change password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This is the first time you logged in.</p>
                        <p>You have to change your password to continue.</p>
                        <Form onSubmit={handleSubmit} validated={false}>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel controlId="floatingInput" label="Password" datatype="password">
                                    <Form.Control
                                        required
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onPaste={handlePaste}
                                        onCopy={handleCopy}
                                        type={type1 ? "password" : ""}
                                        placeholder="Enter Password"
                                        isValid={touched.password && !Boolean(errorPassword)}
                                        isInvalid={touched.password && Boolean(errorPassword)}
                                    />
                                    <i onClick={Eye1} className={`fa ${eye1 ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg" }`} style={{position:"absolute",zIndex:"1", top:"48%", left:"86%"}}></i>
                                    <Form.Control.Feedback type="invalid">{errorPassword}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">Valid password</Form.Control.Feedback>
                                </Form.FloatingLabel>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel controlId="floatingInput" label="Confirm password" datatype="password">
                                    <Form.Control
                                        required
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onPaste={handlePaste}
                                        onCopy={handleCopy}
                                        type={type2 ? "password" : ""}
                                        placeholder="Enter Confirm Password"
                                        isValid={touched.confirmPassword && !Boolean(errorConfirmPassword)}
                                        isInvalid={touched.confirmPassword && Boolean(errorConfirmPassword)}
                                    />
                                    <i onClick={Eye2} className={`fa ${eye2 ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg" }`} style={{position:"absolute",zIndex:"1", top:"48%", left:"86%"}}></i>
                                    <Form.Control.Feedback type="invalid">{errorConfirmPassword}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">Valid confirm password</Form.Control.Feedback>
                                </Form.FloatingLabel>

                            </Form.Group>
                            <button disabled={!formValid} type="submit" className="btn btn-dark-edit" style={{float:"right"}}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Save
                            </button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    } else {
        return null;
    }
}
export default FirstLoginModal;
