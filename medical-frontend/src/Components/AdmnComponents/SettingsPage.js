import React, { useState } from 'react';
import { FaBriefcaseMedical, FaClinicMedical, FaUserCog } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role'); // Fetch role (medic or patient)

  // Sample state for notifications and password management
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [password, setPassword] = useState('');

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate(); // Use useNavigate

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {role === 'medic' ? 'Medic Settings' : 'Patient Settings'}
        </h2>

        {/* General Settings */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3 flex items-center">
            <FaUserCog className="mr-2" />
            General Settings
          </h3>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Change Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="border p-2 w-full rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
              Update Password
            </button>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Notifications</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationToggle}
                className="mr-2"
              />
              <span>{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        </div>

        {/* Role-Based Settings */}
        {role === 'medic' ? (
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              <FaBriefcaseMedical className="mr-2" />
              Medic-Specific Settings
            </h3>
            <p className="text-gray-700 mb-2"><strong>Clinic Information:</strong> Heart Care Clinic</p>
            <p className="text-gray-700 mb-2"><strong>Consultation Hours:</strong> Mon-Fri, 9 AM - 5 PM</p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
                Update Clinic Information
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
                Update Consultation Hours
              </button>
              <button 
              onClick={() => navigate('/dashboard?role=medic')}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              <FaClinicMedical className="mr-2" />
              Patient-Specific Settings
            </h3>
            <p className="text-gray-700 mb-2"><strong>Primary Doctor:</strong> Dr. Emily Johnson</p>
            <p className="text-gray-700 mb-2"><strong>Emergency Contact:</strong> John Smith, (555) 123-4567</p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
                Update Emergency Contact
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
                Update Insurance Information
              </button>
            </div>
            <button 
              onClick={() => navigate('/dashboard?role=patient')}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
