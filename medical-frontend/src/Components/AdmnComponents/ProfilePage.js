import React from 'react';
import { FaBriefcaseMedical, FaClinicMedical, FaUser, FaUserMd } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  // Get the query parameter from the URL to determine the role (medic or patient)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role'); // Fetch the role (e.g., 'medic' or 'patient')
  const navigate = useNavigate();


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {role === 'medic' ? 'Medic Profile' : 'Patient Profile'}
        </h2>
        
        {/* Common Profile Information */}
        <div className="mb-5">
          <div className="flex items-center mb-4">
            {role === 'medic' ? (
              <FaUserMd className="text-blue-500 text-4xl mr-4" />
            ) : (
              <FaUser className="text-blue-500 text-4xl mr-4" />
            )}
            <div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">Email: johndoe@example.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on role */}
        {role === 'medic' ? (
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              <FaBriefcaseMedical className="mr-2" />
              Medic Information
            </h3>
            <p className="text-gray-700 mb-2"><strong>Specialization:</strong> Cardiologist</p>
            <p className="text-gray-700 mb-2"><strong>Years of Experience:</strong> 10 years</p>
            <p className="text-gray-700 mb-2"><strong>Clinic:</strong> Heart Care Clinic</p>
            <p className="text-gray-700 mb-2"><strong>Patients Seen:</strong> 1,200+</p>
            <p className="text-gray-700 mb-2"><strong>Consultation Hours:</strong> Mon-Fri, 9 AM - 5 PM</p>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              <FaClinicMedical className="mr-2" />
              Patient Information
            </h3>
            <p className="text-gray-700 mb-2"><strong>Age:</strong> 45</p>
            <p className="text-gray-700 mb-2"><strong>Blood Type:</strong> O+</p>
            <p className="text-gray-700 mb-2"><strong>Current Medications:</strong> Lisinopril 10mg</p>
            <p className="text-gray-700 mb-2"><strong>Allergies:</strong> Penicillin</p>
            <p className="text-gray-700 mb-2"><strong>Primary Doctor:</strong> Dr. Emily Johnson</p>
            <p className="text-gray-700 mb-2"><strong>Last Visit:</strong> August 15, 2024</p>
          </div>
        )}

<button 
          onClick={() => navigate('/dashboard?role=patient')}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 m-2 hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
