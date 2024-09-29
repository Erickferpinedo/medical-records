import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrescriptionRisk from './Components/AdmnComponents/PrescriptionRisk';
import ProfilePage from './Components/AdmnComponents/ProfilePage';
import SettingsPage from './Components/AdmnComponents/SettingsPage';
import Appointments from './Components/AdmnComponents/appointments';
import Dashboard from './Components/AdmnComponents/dashboard';
import Login from './Components/AdmnComponents/login';
import Signup from './Components/AdmnComponents/signup';
import SubscribePatient from './Components/DocComponents/SubscribePatient';
import ViewMedicalRecords from './Components/DocComponents/ViewMedicalRecords';
import ViewPatients from './Components/DocComponents/ViewPatients';
import MedicalRecords from './Components/patientComponents/MedicalRecords';
import PatientMedications from './Components/patientComponents/PatientMedication';
import UploadMedicalRecords from './Components/patientComponents/UpdateMedicalRecords';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/view-patients" element={<ViewPatients />} />
        <Route path="/view-medical-records/:patientId" element={<ViewMedicalRecords />} />
        <Route path="/Patient-subscription/:patientId" element={<SubscribePatient />} />
        <Route path="/schedule" element={<Appointments />} />
        <Route path="/medical-record-patient" element={<MedicalRecords />} />
        <Route path="/patient-medication" element={<PatientMedications />} />
        <Route path="/prescription-risk" element={<PrescriptionRisk />} />
        <Route path="/schedule/patient" element={<Appointments userRole="patient" />} />
        <Route path="/schedule/medic" element={<Appointments userRole="medic" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/update-medical-records" element={<UploadMedicalRecords />} />


      </Routes>
    </Router>
  );
}

export default App;
