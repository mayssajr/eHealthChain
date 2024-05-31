import { EthProvider } from "./contexts/EthContext";
import { Routes, Route } from 'react-router-dom';
import Interface from "./components/InterfaceLogin";
import AdminDashboard from "./components/AdminComp/AdminComp"
import DoctorDashboard from "./components/DoctorComp/doctordashboard"
import NurseDashboard from "./components/NurseComp/Nursedashboard";
import PatientDashboard from "./components/PatientComp/Patientdashboard";
import Doctor from "./components/AdminComp/Doctor";
import Nurse from "./components/AdminComp/Nurse";
import Patient from "./components/AdminComp/Patient"
import AddPatient from "./components/DoctorComp/addpatient";
function App() {
  return (
    <div className="container">
      <EthProvider>

        <Routes>
          
            <Route path="/" element={<Interface />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            
            <Route path="/editdoctor" element={<Doctor />} />
            <Route path="/editnurse" element={<Nurse />} />
            <Route path="/editpatient" element={<Patient />} />
            

            <Route path="/doctordashboard" element={<DoctorDashboard />} />
            <Route path="/addpatient" element={<AddPatient />} />
            <Route path="/nursedashboard" element={<NurseDashboard/>} />
            <Route path="/patientdashboard" element={<PatientDashboard/>} />
            

        </Routes>
      </EthProvider>
    </div>
        );
}

export default App;
