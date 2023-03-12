
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {Routes,Route} from 'react-router-dom'
import Dashboard from "./scences/dashboard/index"
import Team from "./scences/team/index"
import Contacts from "./scences/contacts/contacts"
import Invoices from "./scences/invoices/invoices"
import Form from "./scences/form/form"
import Calendar from "./scences/calendar/calendar" 
import FAQ from "./scences/faq/faq" 
import Bar from "./scences/bar/bar"
import Pie from "./scences/pie/pie" 
import Line from "./scences/line/line" 
import Geography from "./scences/geography/geography" 
import Auth from "./scences/Auth/Auth";
import UserCreate from "./scences/createUser/CreateUser";






function App() {
  const [theme, colorMode] = useMode();  
  
  return (

    <> 
     <div>
     <ColorModeContext.Provider value={colorMode}>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
         <Routes>
         <Route path="/auth"  element={<Auth/>}/>
         <Route path="/profileCreate"  element={<UserCreate/>}/>
          <Route path="/"  element={<Dashboard/>}/>
          <Route path="/team"  element={<Team/>}/>
          <Route path="/contacts"  element={<Contacts/>}/>
          <Route path="/invoices"  element={<Invoices/>}/>        
          <Route path="/Form"  element={<Form/>}/>
          <Route path="/calender" element={<Calendar/>}/>
          <Route path="/faq"  element={<FAQ/>}/>
          <Route path="/bar"  element={<Bar/>}/>
          <Route path="/pie"  element={<Pie/>}/>
          <Route path="/line"  element={<Line/>}/>
          <Route path="/geography"  element={<Geography/>}/>

         </Routes>

         
    </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
    </>
  );

}


export default App;
