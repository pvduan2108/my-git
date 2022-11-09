import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import "../navbar/Nav.css";
import "../navbar/ResponsiveNav.css";
import { FaAlignJustify } from "react-icons/fa";
import {Container,Nav, Navbar, NavDropdown} from "react-bootstrap";

import LogoutModal from "../Modal/LogoutModal";
import ChangePasswordModal from "../Modal/ChangePasswordModal";

const Header = () => {
  const navigate = useNavigate();
  const [pageName,setPageName]=useState("Online Asset Management");
  const pathName = window.location.pathname;
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch(pathName){
      case "/":
        setPageName("Online Asset Management");
        break;
      case "/manageassets":
        setPageName("Manage Asset");
        break;
      case "/manageassets/create":
        setPageName("Manage Asset > Create New Asset");
        break;
      case "/manageassignments":
        setPageName("Manage Assignment");
        break;
      case "/assignments/create":
        setPageName("Manage Assignment > Create New Assignment");
        break;
      case "/edit_assignment":
        setPageName("Manage Assignment > Edit Assignment");
        break;
      case "/manageusers":
        setPageName("Manage User");
        break;
      case "/adduser":
        setPageName("Manage User > Create New User");
        break;
      case "/login":
        setPageName("Login");
        break;
      case "/requestforreturning":
        setPageName("Request For Returning");
        break;
      case "/report":
        setPageName("Report");
        break;
    }
    if(window.location.pathname.includes("/manageassets/")&&window.location.pathname !=="/manageassets/create"){
      setPageName("Manage Asset > Edit Asset");
    }
    if(window.location.pathname.includes("/manageusers/")){
      setPageName("Manage User > Edit User");
    }

    document.title = pageName;
  }, [pageName, pathName]);
  const [navItem, setNavItem] = useState("rookie-navbar-items");
  function handleClick(){
    if(window.innerWidth<=1000){
      if(navItem==="rookie-navbar-items"){
        setNavItem("rookie-navbar-items-hided");
      }else{
        setNavItem("rookie-navbar-items");
      }
    }
    if(window.innerWidth>1000){
      setNavItem("rookie-navbar-items");
    }
  }
useEffect(()=>{
  if(window.innerWidth>1000){
    setNavItem("rookie-navbar-items");
  }
}
,[]);
  const setLoginPage = () => {
    localStorage.setItem("loginStatus", "1");
     navigate('/login')
  }
  const getLoginButton = () => {
    let getStatus = localStorage.getItem("loginStatus");
    if (getStatus === null && localStorage.getItem("username") === null) {
      return (
           <div>
              <div id="loginn" onClick={setLoginPage} style={{marginTop:"20px",marginRight:"20px", fontSize:"35px"}}>
                Login
              </div>
          </div>
      )
    } else {
      return (
          <div>
            <Navbar expand="lg">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"  style={{marginTop:"20px",marginRight:"20px", fontSize:"35px"}}>
                  <Nav className="me-auto">
                    <NavDropdown title={localStorage.getItem("username")} id="basic-nav-dropdown">
                            <LogoutModal/>
                        <NavDropdown.Divider />
                            <ChangePasswordModal/>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
      )
    }
  }

  const getManageAsset= () => {
    if (localStorage.getItem("authority") === "ADMIN") {
        return (
            <Link
                to="/manageassets"
                onClick={() => {
                    setPageName("Manage Asset");
                    handleClick();
                }}
            >
                <div id={navItem}
                style={pageName==="Manage Asset"||
                pageName==="Manage Asset > Edit Asset"||
                pageName==="Manage Asset > Create New Asset"?{backgroundColor:"#cc2239",color:"white"}:{}}
                >
                    <>Manage Asset</>
                </div>
            </Link>
        )
    }
  }
  const getManageAssignment = () => {
      if (localStorage.getItem("authority") === "ADMIN") {
          return (
              <Link to="/manageassignments"
                    onClick={() => {
                        handleClick();
                    }}
              >
                  <div id={navItem}
                  style={pageName==="Manage Assignment"||
                  pageName==="Manage Assignment > Edit Assignment"||
                  pageName==="Manage Assignment > Create New Assignment"?{backgroundColor:"#cc2239",color:"white"}:{}}
                  >
                      <>Manage Assignment</>
                  </div>
              </Link>
          )
      }

  }

  const getManageUser = () => {
      if (localStorage.getItem("authority") === "ADMIN") {
          return (
              <Link to="/manageusers"
                    onClick={() => {
                        handleClick();
                    }}
              >
                  <div id={navItem}
                  style={pageName==="Manage User"||
                  pageName==="Manage User > Edit User"||
                  pageName==="Manage User > Create New User"?{backgroundColor:"#cc2239",color:"white"}:{}}
                  >
                      <>Manage User</>
                  </div>
              </Link>
          )
      }

  }
  const getRequest = () => {
      if (localStorage.getItem("authority") === "ADMIN") {
          return (
              <Link to="/requestforreturning"
                    onClick={() => {
                        handleClick();
                    }}
              >
                  <div id={navItem}
                  style={pageName==="Request For Returning"?{backgroundColor:"#cc2239",color:"white"}:{}}
                  >
                      <>Request for Returning</>
                  </div>
              </Link>
          )
      }
  }

  const getReport = () => {
      if (localStorage.getItem("authority") === "ADMIN") {
          return (
              <Link to="/report"
                    onClick={() => {
                        handleClick();
                    }}
              >
                  <div id={navItem}
                  style={pageName==="Report"?{backgroundColor:"#cc2239",color:"white"}:{}}
                  >
                      <>Report</>
                  </div>
              </Link>
          )
      }
  }

if (localStorage.getItem("loginStatus") === "1") {
    return null;
  } else {
    return (
        <>
          <div className="header">
            <div id="h1">
              <div className="pageName">
                {pageName}
                </div>
            </div>
            <FaAlignJustify id="rookie-navbar-icon" onClick={() => {
              handleClick();
            }}/>
            {getLoginButton()}
          </div>
          <div className="rookie-navbar">
            <Link to="/">
              <div id="rookie-navbar-image">
                <img
                    id="logo"
                    src={
                      "https://vnn-imgs-f.vgcloud.vn/2020/01/16/11/nashtech-doi-nhan-dien-thuong-hieu.jpg"
                    }
                    alt="logo"
                />
                <div id="rookie-navbar-text" style={{fontWeight:"bold"}}>
                  <>Online Asset Management</>
                </div>
              </div>
            </Link>
            <Link to="/"
                  onClick={() => {
                    handleClick();
                  }}
            >
              <div id={navItem}
              style={pageName==="Online Asset Management"?{backgroundColor:"#cc2239",color:"white"}:{}}
              >
                <>Home</>
              </div>
            </Link>
              {getManageUser()}
              {getManageAsset()}
              {getManageAssignment()}
              {getRequest()}
              {getReport()}
          </div>
        </>
    );
  }
};
export default Header;
