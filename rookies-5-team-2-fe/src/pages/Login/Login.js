import './LoginPage.css'
import {useState} from "react";
import {validateMaxLength, validatePassword, validateUsername} from "../../components/validation/Validation";
import {Form, FormGroup} from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import {API_URL} from "../../constants";
import bcrypt from "bcryptjs";
const LoginPage = () => {
    const saltRounds = 10;
    const[eye,seteye]=useState(false);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(true);
    const Eye=()=>{
        if(password==="password"){
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else{
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const [touched, setTouched] = useState({
        username: false,
        password: false
    })

    const errorUsername = validateMaxLength(values.username, "Username");
    const errorPassword = validateMaxLength(values.password, "Password");

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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post(`${API_URL}authenticate`, { "username" : `${values.username}`,
                "password" : `${values.password}`}
            , {headers: {"Content-Type": "application/json"}})
            .then(response => {
                if (response.request.status === 200) {
                    localStorage.setItem('username', values.username);
                    localStorage.setItem('loginStatus', '2');
                    localStorage.setItem('token', response.data.jwttoken);
                    localStorage.setItem('authority', response.data.authority)
                    localStorage.setItem('firstTime', response.data.firstTime)
                    localStorage.setItem('locationCode', response.data.locationCode)
                    localStorage.setItem('mockPassword', bcrypt.hashSync(values.password, saltRounds))

                    navigate("/")
                    toast.success("Login success", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch(function (error) {
            if (error.request.status === 401) {
                toast.error("Username or password is incorrect. Please try again", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error("Server can not be reached", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.removeItem('loginStatus');
                navigate("/home")
            }
        })

    }
    const formValid = !errorUsername && !errorPassword;
    return (
        <div className={"allScreen"}>
            <div className="login-box">
                <h2>Login</h2>
                <Form onSubmit={handleSubmit} validated={false}>
                    <FormGroup className="mb-3">
                        <Form.FloatingLabel controlId="floatingInput" label="Username*">
                            <Form.Control
                                required
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="username"
                                placeholder="Enter Username"
                                isValid={touched.username && !Boolean(errorUsername)}
                                isInvalid={touched.username && Boolean(errorUsername)}
                            />
                            <Form.Control.Feedback type="invalid">{errorUsername}</Form.Control.Feedback>

                            {/*<Form.Control.Feedback type="valid">Username look goods</Form.Control.Feedback>*/}
                        </Form.FloatingLabel>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.FloatingLabel controlId="floatingInput" label="Password*" datatype="password">
                            <Form.Control
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type={type ? "password" : ""}
                                placeholder="Enter Password"
                                isValid={touched.password && !Boolean(errorPassword)}
                                isInvalid={touched.password && Boolean(errorPassword)}
                                style={{width:"100%", zIndex:"-1"}}
                            ></Form.Control>
                            <i onClick={Eye} className={`fa ${eye ? "fa-solid fa-eye-slash fa-lg" : "fa-solid fa-eye fa-lg" }`} style={{position:"absolute",zIndex:"1", top:"1.5vw", left:"78%"}}></i>
                            <Form.Control.Feedback type="invalid">{errorPassword}</Form.Control.Feedback>
                            {/*<Form.Control.Feedback type="valid">Valid password</Form.Control.Feedback>*/}
                        </Form.FloatingLabel>
                    </FormGroup>
                    <button disabled={!formValid} type="submit" className="btn btn-dark">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </Form>
            </div>
        </div>
    );

}
export default LoginPage;
