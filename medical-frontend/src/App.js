import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Components/AdmnComponents/dashboard';
import SubscribePatient from './Components/DocComponents/SubscribePatient';
import ViewMedicalRecords from './Components/DocComponents/ViewMedicalRecords';
import ViewPatients from './Components/DocComponents/ViewPatients';
import Login from './Components/AdmnComponents/login';
import Signup from './Components/AdmnComponents/signup';
import Appointments from './Components/AdmnComponents/appointments';

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

      </Routes>
    </Router>
  );
}

export default App;
