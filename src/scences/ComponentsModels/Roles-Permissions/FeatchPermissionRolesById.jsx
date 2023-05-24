import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../User/NewUser.css";

import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

function FetchPermissionById() {
  const { id } = useParams();
  console.log("id:", id);

  const navigate = useNavigate();

  const permissiontab = useSelector(
    (state) => state.FetchRoles_PermissionsStore
  );
  const permissions = permissiontab.Permissions_Roles;
  console.log("permission_rolestab", permissions);

  console.log("permissions:", permissions); // add this line to check the value of permissions

  const permissionId = parseInt(id); // convert id to an integer

  const permission = permissions.find((item) => item.id === permissionId);
  // const permission = permissions.find((item) => item.role_name === id.toString());

  console.log("roleid:", permission);



  const { permission_names, role_name } = permission || {};

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="MainContainer22">
          <h2 className="WelcomeText">
            Permission Details{" "}
            <button onClick={() => navigate(`/FeatchRole_Permission`)} className="back-btn">
              Back
            </button>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Permission Names</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>
              {permission ? (
                <tr>
                  <td>
                    <ul style={{ listStyle: "none", paddingLeft: "1em" }}>
                      {permission.permission_names.map((name, index) => (
                        <li key={index} style={{ position: "relative" }}>
                          <span
                            style={{
                              position: "absolute",
                              left: "-1em",
                              top: "0.2em",
                            }}
                          >
                            &#8226;
                          </span>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {permission.role_name}
                    <br></br>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="2">Permission not found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FetchPermissionById;
