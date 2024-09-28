import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Medical App</h2>
        <ul>
          <li className="mb-3"><a href="#profile" className="hover:underline">Profile</a></li>
          <li className="mb-3"><a href="#appointments" className="hover:underline">Appointments</a></li>
          <li className="mb-3"><a href="#records" className="hover:underline">Medical Records</a></li>
          <li className="mb-3"><a href="#settings" className="hover:underline">Settings</a></li>
          <li className="mt-5"><a href="/" className="hover:underline">Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-5">Dashboard</h2>
        {role === 'medic' && (
          <div className="bg-white shadow rounded-lg p-5 mb-5">
            <h3 className="text-2xl font-bold mb-3">Medic Dashboard</h3>
            <p>Here you can manage patient treatments, view schedules, etc.</p>
            <button className="bg-blue-600 text-white px-4 py-2 m-2 rounded mt-4 hover:bg-blue-700">View Patients</button>
            <button className="bg-blue-600 text-white px-4 py-2 m-2 rounded mt-2 hover:bg-blue-700">Schedule Appointments</button>
          </div>
         )}
        {role === 'nurse' && (
          <div className="bg-white shadow rounded-lg p-5 mb-5">
            <h3 className="text-2xl font-bold mb-3">Nurse Dashboard</h3>
            <p>Here you can check patient vitals, update records, etc.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 m-2 hover:bg-blue-700">Check Vitals</button>
            <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded mt-2 hover:bg-blue-700">Update Records</button>
            <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded mt-2 hover:bg-blue-700">Medication Management</button>
          </div>
        )}
        {role === 'patient' && (
          <div className="bg-white shadow rounded-lg p-5 mb-5">
            <h3 className="text-2xl font-bold mb-3">Patient Dashboard</h3>
            <p>Here you can view your medical records, appointments, etc.</p>
            <button className="bg-blue-600 text-white  px-4  py-2 rounded mt-4 hover:bg-blue-700">View Medical Records</button>
            <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded mt-2 hover:bg-blue-700">Book an Appointment</button>
            <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded mt-2 hover:bg-blue-700">View Medications</button>
            <button className="bg-blue-600 text-white px-4 m-2 py-2 rounded mt-2 hover:bg-blue-700">Update Medical Records</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
