import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from '../src/Components/dashboard';
import SubscribePatient from './Components/SubscribePatient';
import ViewMedicalRecords from './Components/ViewMedicalRecords';
import ViewPatients from './Components/ViewPatients';
import Login from './Components/login';
import Signup from './Components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/view-patients" element={<ViewPatients />} />
        <Route path="/view-medical-records/:patientId" element={<ViewMedicalRecords />} />
        <Route path="/Patient-subscription/:patientId" element={<SubscribePatient />} />
      </Routes>
    </Router>
  );
}

export default App;
