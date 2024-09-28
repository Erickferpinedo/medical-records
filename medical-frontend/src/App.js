import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from '../src/Components/dashboard';
import Login from './Components/login';
import Signup from './Components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;
