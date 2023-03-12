import {Box} from "@mui/material"
import Header from "../../components/Header"
import PieChart from "../../components/PieChart"
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import '../../index.css';



const Pie =()=>{
    return(
        <div  className="app">
        <Sidebar/> 
         <div  className="content">
         <Topbar/>
        <Box m="20px">
            <Header title="Pie Chart"  subtitle="Simple Pie Chart"></Header>
            <Box height="75vh">
                <PieChart/>
            </Box>
        </Box>
        </div>
        </div>
    )
}

export default Pie;