import {Box} from "@mui/material"
import Header from "../../components/Header"
import LineChart from "../../components/LineChart"
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import '../../index.css';

const Line=()=>{

    return(
        <div  className="app">
        <Sidebar/> 
         <div  className="content">
         <Topbar/>
        <Box m="20px">
            <Header title="Line Chart" subtitle="Simple Line Chart"/>
            <Box  height="75vh">
                <LineChart/>
            </Box>
        </Box>
        </div>
        </div>
    )
}

export default Line;