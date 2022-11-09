import React from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import ManageAssets from "./pages/ManageAsset/view/ManageAssets";
import ManageAssignments from "./pages/ManageAssignment/ManageAssignments";
import EditAssignment from "./pages/ManageAssignment/EditAssignment/EditAssignment";
import ManageUsers from "./pages/ManageUser/views/ManageUsers";
import RequestForReturning from "./pages/RequestForReturning/RequestForReturning";
import Report from "./pages/Report/views/Report";
import Header from "./components/header/Header";
import "./pages/Page.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import EditUser from "./pages/ManageUser/views/EditUser";
import EditAsset from "./pages/ManageAsset/view/EditAsset";
// import { AddNewUser } from "./pages/ManageUser/components/AddNewUser";
import CreateAsset from "./pages/ManageAsset/view/CreateAsset";
import CreateNewUser from "./pages/ManageUser/views/CreateNewUser";
import CreateAssignment from "./pages/ManageAssignment/CreateAssignment/CreateAssignment";
function App() {
  const sampleLocation = useLocation();
  const current = sampleLocation.pathname;
  if (current !== "/login" && localStorage.getItem("loginStatus") === "1") {
    localStorage.removeItem("loginStatus");
  }
  if (current === "/login") {
    localStorage.setItem('loginStatus', "1");
  }
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manageassets" element={<ManageAssets />} />       
        <Route path="/create_asset" element={<CreateAsset/>}/>
        <Route path="/edit_asset" element={<EditAsset />}/>
        <Route path="/manageassignments" element={<ManageAssignments />} />
        <Route path="/assignments/create" element={<CreateAssignment />} />
        <Route path="/edit_assignment" element={<EditAssignment />} />
        <Route path="/manageusers">
          <Route
            index
            element={<ManageUsers />}
          />
          <Route
            path=":username"
            element={<EditUser />}
          />
        </Route>
        <Route path="adduser" element={<CreateNewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/requestforreturning" element={<RequestForReturning />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
