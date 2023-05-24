import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import { useEffect, useState, useRef} from "react";
import { featchLogs } from "../../../redux/Logs/FeatchLogs_Slice";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import jwt_decode from "jwt-decode";

import {
  fetchRoles,
  fetchRole,
} from "../../../redux/RolesSlices/FetchRolesSlice";


export const CustomizedTimeline = () => {

 


  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  const decoded_token = jwt_decode(accessToken);
  console.log("decoded_token",decoded_token);
  const RolesUser = decoded_token.role_id[0];


  // const logsAllTable = useSelector((state) => {
  //     return state.LogsStore;
    
  // });

  // const TabLogss = logsAllTable.Logs ; // Use an empty array as the default value
  // const iduserlogss=TabLogss.map((items)=>items.id_user);
  // // console.log("TabLogss",TabLogss)

  const logs = useSelector((state) => state.LogsStore);

  // const logs = useSelector((state) => state.LogsStore);
  console.log("logsStore", logs);
  const role = useSelector((state) => state.FetchRolsStore);
  const roles = role.Roles;

  const TabLogs = logs.Logs ; // Use an empty array as the default value

   const dispatch = useDispatch();


   
  useEffect(() => {
      dispatch(featchLogs());
    
  }, []);




 

  const logsData = JSON.stringify(logs.Logs);

  const downloadLogs = () => {
    const element = document.createElement("a");
    const file = new Blob([logsData], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "logs.json";
    document.body.appendChild(element);
    element.click();
  };
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermLowerCase = searchTerm.toLowerCase();
  const filteredRows = TabLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTermLowerCase) ||
      log.date.toLowerCase().includes(searchTermLowerCase)
  );

//   useEffect(() => {
//     if(RolesUser===87)
//  {  
//    dispatch(fetchRoles());
//   }
//   }, [RolesUser]);
  
useEffect(() => {
  if (RolesUser === 87) {
    dispatch(fetchRoles());
  }
}, [RolesUser]);

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Topbar />

        <Typography
          variant="h1"
          component="span"
          style={{
            color: "#8A90FA",
            textAlign: "center",
            marginLeft: "688px",
            marginBottom: "200px",
          }}
        >
          ALL LOGS
        </Typography>
        <div>
          <div>
            <button
              style={{
                textAlign: "center",
                marginLeft: "1000px",
                padding: "18px",
                width: "200px",
              }}
              onClick={downloadLogs}
            >
              Export Logs
            </button>
          </div>
        </div>
        <Timeline position="alternate">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            style={{
              height: "44px",
              width: "34%",
              backgroundColor: "#eeeeee",
              paddingLeft: "44px",
              marginLeft: "8px",
              backgroundImage:
                'url("https://cdn-icons-png.flaticon.com/512/149/149852.png")',
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "12px 50%",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            placeholder="Search with Date Or Action"
          />
          {[...filteredRows]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((log) => (
              <TimelineItem key={log.id} onClick={filteredRows}>
                <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h5" component="span" color="#8A90FA">
                    Date
                  </Typography>
                  <Typography>{log.date}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary">
                    <LaptopMacIcon style={{ color: "#8A90FA" }} />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h4" component="span" color="#FE4B7F">
                    Actions
                  </Typography>
                  <Typography variant="h5">{log.action}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </div>
    </div>
  );
};

export default CustomizedTimeline;
