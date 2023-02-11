import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {  BrowserRouter as Router,  Routes, Route} from "react-router-dom";
import NoteState from "./context/notes/Notestate";
import Alert from "./components/Alert";
import { useState } from "react";




function App() {

  const initalAlert = {
        "message":"Testing Message",
        "type" :"info",
        "display":"yes"
  } 

  const [alert,setAlert] = useState(initalAlert);

  setTimeout(()=>{
     
    setAlert({
       
      "message":"",
      "type":"",
      "display":"none"

    })

  },4000);

  const showAlert = (message,type)=>{
      
    setAlert({message:message,type:type});
   
  }

  return (
    <div className="App">
      <NoteState>

      <Router>
       <Navbar showAlert={showAlert}/>
       <Alert  alert={alert} />
       <div className="container">
       <Routes>
        
        <Route  exact path="home" element={<Home showAlert={showAlert}/>} />
        <Route  exact path="about" element={<About />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="login"  element={<Login showAlert={showAlert} />} />
        <Route exact path="signup"  element={<Signup showAlert={showAlert} />} />
       </Routes>
       </div>
     
       </Router>
       </NoteState>
      
 
       
    </div>
  );
}

export default App;
