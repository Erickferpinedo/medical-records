import React from 'react';

import {
  FaCalendarAlt,
  FaClipboardList,
  FaCog,
  FaFileMedical,
  FaHeartbeat,
  FaPills,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ViewPatients from '../DocComponents/ViewPatients'; 
import Appointments from '../AdmnComponents/appointments'; // Ensure correct path

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-5">Medical App</h2>
          <ul>
            <li className="mb-3 flex items-center">
              <FaUser className="mr-2" />
              <Link to="#profile" className="hover:underline">Profile</Link>
            </li>
            <li className="mb-3 flex items-center">
              <FaCalendarAlt className="mr-2" />
              <Link to="/schedule" className="hover:underline">Appointments</Link>
            </li>
            <li className="mb-3 flex items-center">
              <FaFileMedical className="mr-2" />
              <Link to="#records" className="hover:underline">Medical Records</Link>
            </li>
            <li className="mb-3 flex items-center">
              <FaCog className="mr-2" />
              <Link to="#settings" className="hover:underline">Settings</Link>
            </li>
            {role === 'medic' && (
              <li className="mb-3 flex items-center">
                <FaClipboardList className="mr-2" />
                <Link to="/view-patients" className="hover:underline">View Patients</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <FaSignOutAlt className="mr-2" />
          <Link to="/login" className="hover:underline">Logout</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-5">Dashboard</h2>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {role === 'medic' && (
                  <div className="bg-white shadow rounded-lg p-5 mb-5">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      <FaHeartbeat className="mr-2" />
                      Medic Dashboard
                    </h3>
                    <p>Manage patient treatments, view schedules, and more.</p>
                    <button
                      onClick={() => navigate('/view-patients')}
                      className="bg-blue-600 text-white px-4 py-2 m-2 rounded mt-2 hover:bg-blue-700"
                    >
                      View Patients
                    </button>
                  </div>
                )}

                {role === 'patient' && (
                  <div className="bg-white shadow rounded-lg p-5 mb-5">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      <FaPills className="mr-2" />
                      Patient Dashboard
                    </h3>
                    <p>View your medical records, appointments, and more.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 m-2 hover:bg-blue-700">
                      View Medical Records
                    </button>
                    <button 
        onClick={() => navigate('/Schedule')} // Navegar a /appointments
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700"
      >
        Book an Appointment
      </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700">
                      View Medications
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700">
                      Update Medical Records
                    </button>
                  </div>
                )}
              </>
            }
          />
          <Route path="/schedule" element={<Appointments userRole={role} />} />
          <Route path="/view-patients" element={<ViewPatients />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
