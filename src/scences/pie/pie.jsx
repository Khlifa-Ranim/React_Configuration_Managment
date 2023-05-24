import {Box} from "@mui/material"
import Header from "../../components/Header"
import PieChart from "../../components/PieChart"
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
    fetchRoles,

  } from "../../redux/RolesSlices/FetchRolesSlice"
const Pie =()=>{

    const dispatch = useDispatch();

    const role = useSelector((state) => state.FetchRolsStore);
    const tabroles = role.Roles;

    useEffect(() => {
        dispatch(fetchRoles());
      
      }, []); // run useEffect when roleDeleted changes
    
    return(
        <div  className="app">
        <Sidebar/> 
         <div  className="content">
         <Topbar/>
        <Box m="20px">
            <Header title="Pie Chart"  subtitle="Simple Pie Chart"></Header>
            <Box height="75vh">
                <PieChart data={tabroles}/>
            </Box>
        </Box>
        </div>
        </div>
    )
}

export default Pie;