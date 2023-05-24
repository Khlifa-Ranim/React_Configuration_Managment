import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { CreateRole, addRole } from "../../../redux/RolesSlices/AddRoleSlice";
import "../User/NewUser.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const AddRole = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const Navigate = useNavigate();

  const CreateRoleHandle = (e) => {
    e.preventDefault();
    setFromErrors(validate(name, description));
    setIsSubmit(true);

    if (
      Object.keys(formErrors).length === 0 &&
      name.trim() !== "" &&
      description.trim() !== ""
    ) {
      dispatch(CreateRole({ name, description }));
      setTimeout(() => navigate("/FetchRoles")); // redirect after 3 seconds
    }
  };

  const validate = (name, description) => {
    const errors = {};

    const name_pattern = /^[a-zA-Z\s]*$/;
    const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

    if (!name) {
      errors.name = "Name is Required";
    } else if (!name_pattern.test(name)) {
      errors.name = "Name should only contain letters and spaces";
    } else if (name.length < 4) {
      errors.name = "Name should contain at least 4  letters";
    }
    if (!description) {
      errors.description = "Description is Required";
    } else if (description.length < 8) {
      errors.description = "Description should contain at least 8 letters";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length > 0 && isSubmit) {
      console.log(formErrors);
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />

          <div className="container" style={{height:"200px", paddingTop:"80px",paddingBottom:"180px"}}>

            <form class="form">
              <p class="title">Add new role </p>
              <p class="message"> Create New Role</p>
              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  placeholder="Non de Role"
                  value={name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setName(value);
                    setFromErrors({ ...formErrors, [name]: value });
                  }}
                />
                <span>Name</span>
                <p style={{ color: "red" }}>{formErrors.name}</p>
              </label>

              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={description}
                  placeholder="Donner Une Description"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setDescription(value);
                    setFromErrors({ ...formErrors, [name]: value });
                  }}
                />
                <span>Description</span>
                <p style={{ color: "red" }}>{formErrors.description}</p>
              </label>

              <div style={{ marginLeft: "40px" }}>
                <button
                  class="submit"
                  style={{ width: "400px" }}
                  onClick={CreateRoleHandle}
                >
                  Add Role
                </button>
                <button
                  class="submit"
                  style={{
                    marginLeft: "20px",
                    background: "gray",
                    width: "400px",
                  }}
                  onClick={() => {
                    Navigate("/FetchRoles");
                  }}
                >
                  Cancel{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
