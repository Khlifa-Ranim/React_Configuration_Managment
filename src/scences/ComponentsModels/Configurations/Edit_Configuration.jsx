import React, { useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { EditConfiguration } from "../../../redux/ConfigurationSlices/EditConfigurationSlice";
import "../User/NewUser.css";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

const EditPermission = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { id } = useParams(); //take the id from  the router

  const Configurations = useSelector(
    (state) => state.Featch_Configurations_Store
  );
  console.log("Configurations:", Configurations);
  const tabConfigurations = Configurations.TabConfiguration;
  console.log("tabConfigurations", tabConfigurations);

  const existingPermission = tabConfigurations.filter((f) => f.id == id);

  const { defaultValue, name, description, value, version } =
    existingPermission[0];
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [udefaultValue, setUdefaultValue] = useState(defaultValue);
  const [uname, setUname] = useState(name);
  const [udescription, setUdscription] = useState(description);
  const [uvalue, setUvalue] = useState(value);
  const [uversion, setUversion] = useState(version);

  const Update_Configuraion_Handel = (e) => {
    e.preventDefault();

    const decoded_token = jwt_decode(accessToken);
    const user_id = decoded_token.user_id;
    console.log("user_id", decoded_token.user_id);

    console.table(udefaultValue, uname, udescription, uvalue, uversion);
    dispatch(
      EditConfiguration({
        id: id,
        defaultValue: udefaultValue,
        name,
        description: udescription,
        value,
        version,
        user_id,
      })
    );
    setTimeout(() => Navigate("/FeatchConfigurations"), 22); // redirect after 3 seconds
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />

          <div
            className="container"
            style={{ paddingTop: "80px", paddingBottom: "180px" }}
          >
            <form class="form">
              <p class="title">Update Configuration</p>
              <p class="message">
                {" "}
                Update this Configuration only Description and default Value
              </p>
              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={uname}
                  placeholder="Update Name"
                  // onChange={(e) => setUname(e.target.value)}
                />
                <span>Name</span>
              </label>

              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={udescription}
                  placeholder="Update Description"
                  onChange={(e) => setUdscription(e.target.value)}
                />
                <span>Description</span>
              </label>

              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={uvalue}
                  placeholder="Update Value"
                  // onChange={(e) => setUvalue(e.target.value)}
                />
                <span>Value</span>
              </label>
              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={udefaultValue}
                  placeholder="Update DefaultValue"
                  onChange={(e) => setUdefaultValue(e.target.value)}
                />
                <span>Default Value</span>
              </label>

              <label>
                <input
                  required=""
                  type="text"
                  class="input"
                  value={uversion}
                  placeholder="Update Version Of Configuration"
                  // onChange={(e) => setUversion(e.target.value)}
                />
                <span>Version</span>
              </label>
              <div style={{ marginLeft: "40px" }}>
                <button
                  class="submit"
                  style={{ width: "400px" }}
                  onClick={Update_Configuraion_Handel}
                >
                  Versionner Configuration
                </button>
                <button
                  class="submit"
                  style={{
                    marginLeft: "20px",
                    background: "gray",
                    width: "400px",
                  }}
                  onClick={() => {
                    Navigate("/FeatchConfigurations");
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

export default EditPermission;
