import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import DegreePage from "./components/DegreePage";
import ModulePage from "./components/ModulePage";
import CohortPage from "./components/CohortPage";
import Navbar from './components/Navbar';
import StudentList from "./components/StudentList";
import ModuleList from "./components/ModuleList";
import CohortList from "./components/CohortList";
import DegreeDetail from "./components/DegreeDetail";
import StudentDetails from "./components/StudentDetails";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          
          {/* Degrees */}
          <Route exact path="/degrees" element={<DegreePage/>}/>
          <Route exact path="/degrees/:id" element={<DegreeDetail/>} />

          {/* Students */}
          <Route exact path="/students" element={<StudentList/>} />
          <Route exact path="/students/:id" element={<StudentDetails/>} />

          {/* Modules */}
          <Route exact path="/modules" element={<ModuleList/>}/>
          <Route exact path="/modules/:id" element={<ModulePage/>} />

          {/* Cohorts */}
          <Route exact path="/cohorts" element={<CohortList/>} />
          <Route exact path="/cohorts/:id" element={<CohortPage/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
