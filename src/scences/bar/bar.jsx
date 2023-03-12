import {Box} from "@mui/material"
import Header from "../../components/Header"
import BarChat from "../../components/BarChart"
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import '../../index.css';

const Bar=()=>{
    return(
        <div  className="app">
        <Sidebar/> 
         <div  className="content">
         <Topbar/>
    <Box m="20px">
    
    <Header title="Bar Chart" subtitle="Simple Bar Chart"></Header>
    <Box height="75vh">
        <BarChat/>
    </Box>
    </Box>
    </div>
    </div>
    )
}

export  default Bar;