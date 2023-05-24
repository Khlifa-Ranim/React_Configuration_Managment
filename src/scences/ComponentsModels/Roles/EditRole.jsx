import React, { useEffect, useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { editRole } from "../../../redux/RolesSlices/EdiRoleSlice";
import "../User/NewUser.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRole = () => {
  const { id } = useParams(); //take the id from  the router
  const dispatch = useDispatch();

  const role = useSelector((state) => state.FetchRolsStore);
  console.log("role:", role.Roles);
  const roles = role.Roles;
  const Navigate = useNavigate();

  const existingUser = roles.filter((f) => f.id == id);

  const { name, description } = existingUser[0];
  const [uName, setUName] = useState(name);
  const [UDescription, setUDescription] = useState(description);

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const notify = () => {
    toast(" Update succeed  👌");
  };

  const EditRoleHandle = (e) => {
    e.preventDefault();
    console.table(uName, UDescription);

    setFromErrors(validate(uName, UDescription));
    setIsSubmit(true);
    if (
      Object.keys(formErrors).length === 0 &&
      uName.trim() !== "" &&
      UDescription.trim() !== ""
    ) {
      dispatch(editRole({ id: id, name: uName, description: UDescription }));
      notify(); // display toast notification
      setTimeout(() => Navigate("/FetchRoles"), 1000); // redirect after 3 seconds
    }
  };

  const validate = (uName, UDescription) => {
    const errors = {};

    const name_pattern = /^[a-zA-Z\s]*$/;
    const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;

    if (!uName) {
      errors.uName = "Name is Required";
    } else if (!name_pattern.test(uName)) {
      errors.uName = "Name should only contain letters and spaces";
    } else if (uName.length < 4) {
      errors.uName = "Name should contain at least 4 letters";
    }
    if (!UDescription) {
      errors.UDescription = "Description is Required";
    }  else if (UDescription.length < 8) {
      errors.UDescription = "Description should contain at least 8 letters";
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
          <ToastContainer />
          <div
            className="container"
            style={{ paddingTop: "80px", paddingBottom: "180px" }}
          >
            <form class="form">
              <p class="title">Update Role</p>
              <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  class="input"
                  value={uName}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUName(value);
                    setFromErrors({ ...formErrors, [name]: value });
                  }}
                />
                <span>Name</span>
                <p style={{ color: "red" }}>{formErrors.uName}</p>
              </label>

              <label>
                <div className="InputWithButton">
                  <input
                    class="input"
                    value={UDescription}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setUDescription(value);
                      setFromErrors({ ...formErrors, [name]: value });
                    }}
                  />
                  <span>Description</span>

                  <p style={{ color: "red" }}>{formErrors.UDescription}</p>
                </div>
              </label>

              <div style={{ marginLeft: "40px" }}>
                <button
                  class="submit"
                  onClick={EditRoleHandle}
                  style={{ width: "400px" }}
                >
                  Edit Role{" "}
                </button>
                <button
                  class="submit"
                  onClick={() => {
                    Navigate("/FetchRoles");
                  }}
                  style={{
                    marginLeft: "20px",
                    background: "gray",
                    width: "400px",
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

export default EditRole;
