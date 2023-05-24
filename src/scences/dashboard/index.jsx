import Header from "../../components/Header";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import "../../index.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../redux/PermissionSlices/FetchPermissionsSlice";
import { fetchUsers } from "../../redux/UserSlices/FetchUserSlice";
import { fetchRoles } from "../../redux/RolesSlices/FetchRolesSlice";
import { featchConfigurations } from "../../redux/ConfigurationSlices/Featch_ConfigurationSlice";
import { featchConfigurationsVersion } from "../../redux/ConfigurationVersionSlice/FeatchConfigurationVersion";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  /*******************Nomre Permissions*************** */
  const permission = useSelector((state) => state.FetchPermissionStore);
  const permissions = permission.Permissions;
  const permissionCount = permissions.length;
  const sortedTransactionPermissions = [...permissions].sort(
    (a, b) => b.id - a.id
  );

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  /************************Nombre Users*************************** */
  const user = useSelector((state) => state.FetchUsersStore);
  const Users = user.users;
  const UserCount = Users.length;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  /*****************************Nombre Roles******************************** */
  const role = useSelector((state) => state.FetchRolsStore);
  const roles = role.Roles;
  const RolesCount = roles.length;

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  /******************************Nombre Configurations******************************* */
  const Configurations = useSelector(
    (state) => state.Featch_Configurations_Store
  );
  const tabConfigurations = Configurations.TabConfiguration;
  const configurationCount = tabConfigurations.length;
  const sortedTransactions = [...tabConfigurations].sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(featchConfigurations());
  }, []);

  /********************************Nombre Of Version Configuration*********************** */
  const Configuration_version = useSelector(
    (state) => state.FeatchConfigurationversionStore
  );
  const tabConfigurationVersion = Configuration_version.TabConfigurationVersion;
  const ConfigurationVersionCount = tabConfigurationVersion.length;
  const sortedTransactionsVersions = [...tabConfigurationVersion].sort(
    (a, b) => b.id - a.id
  );

  useEffect(() => {
    dispatch(featchConfigurationsVersion());
  }, []); // run useEffect when roleDeleted changes

  const notify = () => {
    toast(" Profile  Ajouter Avec Succès 👌");
  };


  const CreateProfileHandle = (e) => {
    e.preventDefault();
    setFromErrors(validate(name, email, telephone, adresse,description));
    setIsSubmit(true);

    if (
      Object.keys(formErrors).length === 0 &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      telephone.trim() !== ""&&
      adresse.trim() !== ""&&
      description.trim() !== ""
    ) {
    // console.table(name, email, telephone, adresse, description, imageFile);
    if (!imageFile) return;
    setUploading(true);
    axios
      .post(
        "http://localhost:5000/profiles",
        {
          name,
          email,
          telephone,
          adresse,
          description,
          image: " ",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const image = new FormData();
        console.log(res.data);
        image.append("image", imageFile);
        axios
          .put(
            "http://localhost:5000/profile/upload/image/" + res.data.id,
            image
          )
          .then((res) => {
            notify(); // display toast notification
            setOpen(false);
            // Notification code
          })
          .catch((err) => console.log("error"));

        axios
          .post(
            "http://localhost:5000/logs",
            JSON.stringify({
              action: `${
                jwt_decode(localStorage.getItem("token")).username
              } created an profile for ${
                jwt_decode(localStorage.getItem("token")).username
              }`,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {});
  }};
/********************Profile Validation************************* */
const [formErrors, setFromErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);


const validate = (name, email, telephone, adresse,description) => {
  const errors = {};

  const name_pattern = /^[a-zA-Z\s]*$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // pattern to check if email is valid
  const telephonePattern = /^(2|5|9)\d{7}$/; // pattern to check if telephone starts with 2, 5, or 9 and contains exactly 8 numbers

  if (!name) {
    errors.name = "Name is Required";
  } else if (!name_pattern.test(name)) {
    errors.name = "Name should only contain letters and spaces";
  } else if (name.length < 4) {
    errors.name = "Name should contain at least 4 letters";
  }

  if (!email) {
    errors.email = "Email is Required";
  }
  
  else if (!emailPattern.test(email)) {
    errors.email = "Invalid email format : test@example.com ";
  }
  if (!telephone) {
    errors.telephone = "Verification Password is Required";
  } else if (!telephonePattern.test(telephone)) {
    errors.telephone = "Telephone number that starts with 2, 5, or 9 and contains exactly 8 numbers ";
  }

  if (!adresse) {
    errors.adresse = "Adresse is Required";
  }else if (!name_pattern.test(adresse)) {
    errors.adresse = "Adresse should only contain letters and spaces";
  } else if (adresse.length < 8) {
    errors.adresse = "Adresse should contain at least 8 letters";
  }
  if (!description) {
    errors.description = "Name is Required";
  } else if (!name_pattern.test(description)) {
    errors.description = "Description should only contain letters and spaces";
  } else if (description.length < 8) {
    errors.description = "Description should contain at least 8 letters";
  }
  return errors;
};


useEffect(() => {
  if (Object.keys(formErrors).length > 0 && isSubmit) {
    console.log("formErrors", formErrors);
  }
}, [formErrors, isSubmit]);
  useEffect(() => {
    const decoded_token = jwt_decode(accessToken);
    console.log(decoded_token);
    async function fetchProfile() {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/profile/by/user/id/${decoded_token.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.message === "No profile found !") {
          setOpen(true);
        }
      } catch (error) {}
    }

    fetchProfile();
  }, [accessToken]);

  return (
    <div className="app">
      <Sidebar />
      <ToastContainer />
      <div className="content">
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              backgroundColor: "white",
              width: "40%",
              borderRadius: "13px",
              padding: "10px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              style={{ color: "#A4A9FC", marginLeft: "200px" }}
            >
              PLEASE FILL IN YOUR PROFILE DATA
            </Typography>
            {/* START OF FORM */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div class="input-group">
                <input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    setImageFile(file);
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const imageSrc = reader.result;
                      const svgElement = document.getElementById("svg");
                      svgElement.innerHTML = `<image xlink:href="${imageSrc}" height="24" width="24"/>`;
                    };
                  }}
                />

                <label class="avatar1" for="file">
                  <span>
                    <svg fill="none" viewBox="0 0 24 24" id="svg">
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill="#000000"
                          d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z"
                          opacity="0.1"
                        ></path>{" "}
                        <path
                          stroke-width="2"
                          fill="#9ba6a5"
                          d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                        ></path>{" "}
                        <path
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"
                        ></path>{" "}
                        <path
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"
                        ></path>{" "}
                        <path
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </label>
              </div>
              <TextField
                style={{ marginTop: "10px" }}
                id="name"
                label="Name"
                variant="outlined"
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
                label="Email"
                variant="outlined"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setEmail(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.email}</p>
              <TextField
                style={{ marginTop: "10px" }}
                id="telephone"
                label="Telephone"
                variant="outlined"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setTelephone(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.telephone}</p>
              <TextField
                style={{ marginTop: "10px" }}
                id="adresse"
                label="Adresse"
                variant="outlined"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setAdresse(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.adresse}</p>
              <TextField
                style={{ marginTop: "10px" }}
                id="description"
                label="Description"
                variant="outlined"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setDescription(value);
                  setFromErrors({ ...formErrors, [name]: value });
                }}
              />
              <p style={{ color: "red" }}>{formErrors.description}</p>
              {/* <label style={{ marginTop: "10px" }}>
                Profile Picture:
                <input
                  className="Input"
                  type="file"
                  // value={image}
                  onChange={(e) => setImageFile(e.target.files[0])}
                  // accept="image/*"
                />
              </label> */}

              <div style={{ marginTop: "10px" }}>
                <Button variant="outlined">Cancel</Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px", backgroundColor: "#A4A9FC" }}
                  onClick={CreateProfileHandle}
                >
                  Submit
                </Button>
              </div>
            </div>
            {/* END OF FORM */}
          </Box>
        </Modal>
        <Topbar />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>

          {/* GRID & CHARTS */}

          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={UserCount}
                subtitle="Nombre Users"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={permissionCount}
                subtitle="Nombre Of Permissions"
                // progress={permissionCount}
                // increase={permissionCount}
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={RolesCount}
                subtitle="Nombre Of Roles"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={configurationCount}
                subtitle="Nombre Of Configurations"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            {/* <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={ConfigurationVersionCount}
                subtitle="Nombre Of Configurations Version"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box> */}
            {/* ROW 2 */}
            {/* <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Configurations Versions
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  ></Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box> */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Configurations Added
                </Typography>
              </Box>
              {sortedTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.name}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.description}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.version}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.value}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    title="Updated By"
                  >
                    {transaction.updatedBy}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Configurations Versions Added
                </Typography>
              </Box>
              {sortedTransactionsVersions.map((transaction, i) => (
                <Box
                  key={`${transaction.name}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.Value}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.version}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.description}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    title="Updated By"
                  >
                    {transaction.updatedBy}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Permissions Added
                </Typography>
              </Box>
              {sortedTransactionPermissions.map((transaction, i) => (
                <Box
                  key={`${transaction.name}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.endpoint}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.description}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    title="Updated By"
                  >
                    {transaction.method}
                  </Box>
                </Box>
              ))}
            </Box>
            {/* ROW 3 */}
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box> */}
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box> */}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
