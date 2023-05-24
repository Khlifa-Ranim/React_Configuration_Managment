import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import "../../../index.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { CreateConfiguration } from "../../../redux/ConfigurationSlices/AddConfiguraionSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState(1);

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const notify = () => {
    toast(" Configuration  Ajouter Avec Succès 👌");
  };

  const CreateConfigurationHandel = (e) => {
    e.preventDefault();

    setFromErrors(validate(name, value, defaultValue, description, version));
    setIsSubmit(true);

    if (
      Object.keys(formErrors).length === 0 &&
      name.trim() !== "" &&
      description.trim() !== "" &&
      value.trim() !== "" &&
      defaultValue.trim() !== "" &&
      version.trim() !== ""
    ) {
      const decoded_token = jwt_decode(accessToken);
      const user_id = decoded_token.user_id;
      console.log("user_id", decoded_token.user_id);
      dispatch(
        CreateConfiguration({
          name,
          value,
          defaultValue,
          description,
          version,
          decoded_token,
          user_id,
        })
      );
      notify(); // display toast notification
      setTimeout(() => Navigate("/FeatchConfigurations"), 20); // redirect after 3 seconds
    }
  };

  const validate = (name, value, defaultValue, description, version) => {
    const errors = {};

    const name_pattern = /^[a-zA-Z\s]*$/;
    const description_pattern = /^[a-zA-Z\s'éèêàùîôç-]*$/;
    const version_pattern = /^\d+(\.\d+)?$/;

    if (!name) {
      errors.name = "Name is Required";
    } else if (!name_pattern.test(name)) {
      errors.name = "Name should only contain letters and spaces";
    } else if (name.length < 4) {
      errors.name = "Name should contain at least 4  letters";
    }
    if (!description) {
      errors.description = "Description is Required";
    } else if (!description_pattern.test(description)) {
      errors.description = "Description should only contain letters and spaces";
    } else if (description.length < 8) {
      errors.description = "Description should contain at least 8 letters";
    }
    if (!value) {
      errors.value = "Value is Required";
    } else if (value.length < 4) {
      errors.value = "Value should contain at least 4 letters";
    } else if (value.length > 50) {
      errors.value = "Value should not exceed 50 characters";
    }
    if (!defaultValue) {
      errors.defaultValue = "Default Value is Required";
    } else if (defaultValue.length < 4) {
      errors.defaultValue = "Default Value contain at least 4 letters";
    } else if (defaultValue.length > 50) {
      errors.defaultValue = "Default Value not exceed 50 characters";
    }

    if (!version) {
      errors.version = "Version is Required";
    } else if (version !== "1") {
      errors.version = "Version should be equal to 1";
    } else if (!name_pattern.test(name)) {
      errors.version = "Version should only contain letters and spaces";
    }

    return errors;
  };

  return (
    <div className="app">
      <Sidebar />
      <ToastContainer />

      <div className="content">
      <Topbar />
      <div className="container" style={{height:"200px", paddingTop:"80px",paddingBottom:"180px"}}>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "120px",
          }}
        >
          <Box
            style={{
              backgroundColor: "white",
              // width: "50%",
              borderRadius: "13px",
              padding: "10px",
              marginLeft: "1px",
              height: "200px",
            }}
          >
            <p
            class="title"
            >
              Add New configuration
            </p>

            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Please fill in your profile data
            </Typography> */}
            {/* START OF FORM */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "800px",
              }}
            >
              <TextField
                style={{ marginTop: "10px" }}
                id="name"
                label="Name Configuration"
                variant="outlined"
                placeholder="Non de Role"
                value={name}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setName(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.name}</p>

              <TextField
                style={{ marginTop: "10px" }}
                id="email"
                label="Description"
                variant="outlined"
                placeholder="Descrption of configuration"
                value={description}
                // onChange={(e) => setName(e.target.value)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setDescription(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.description}</p>

              <TextField
                style={{ marginTop: "10px" }}
                id="telephone"
                label="Value"
                variant="outlined"
                placeholder="the value of Configuration"
                value={value}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setValue(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.value}</p>

              <TextField
                style={{ marginTop: "10px" }}
                id="adresse"
                label=" DefaultValue"
                variant="outlined"
                placeholder="Defultvalue Of Configuration"
                value={defaultValue}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setDefaultValue(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.defaultValue}</p>

              <TextField
                style={{ marginTop: "10px" }}
                id="description"
                label="Version"
                variant="outlined"
                placeholder="Version of Configuration should be equal to 1"
                value={version}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setVersion(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.version}</p>

              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px", backgroundColor:"#8A8FF7",width:"380px" }}
                  onClick={CreateConfigurationHandel}
                >
                  Create Configuration
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px", backgroundColor: "black",width:"380px" }}
                  onClick={() => {
                    Navigate("/FeatchConfigurations");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
            {/* END OF FORM */}
          </Box>
          {/* </Modal> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
