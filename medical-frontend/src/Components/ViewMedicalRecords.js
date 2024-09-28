// src/Components/ViewMedicalRecords.js
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ViewMedicalRecords = () => {
  const { patientId } = useParams(); // Get patient ID from URL params
  const [medicalRecords, setMedicalRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching medical records based on patient ID
    const fetchMedicalRecords = () => {
      const mockRecords = [
        { id: 1, patientId: 1, date: '2024-09-01', details: 'Annual checkup, all good.' },
        { id: 2, patientId: 1, date: '2024-08-15', details: 'Flu symptoms, prescribed medication.' },
        { id: 3, patientId: 2, date: '2024-09-10', details: 'Follow-up appointment, no issues.' },
        { id: 4, patientId: 3, date: '2024-09-05', details: 'Blood test, results normal.' },
        { id: 5, patientId: 4, date: '2024-09-12', details: 'Allergy testing completed.' },
        // Add more records as needed
      ];
      const patientRecords = mockRecords.filter(record => record.patientId === Number(patientId));
      setMedicalRecords(patientRecords);
    };

    fetchMedicalRecords();
  }, [patientId]);

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold">Medical Records for Patient ID: {patientId}</h3>
        <div className='flex flex-row'>
          <button
            onClick={() => navigate(`/Patient-subscription/${patientId}`)} // Navigate to the prescription page for the patient
            className="bg-gray-600 text-white px-4 py-2 mr-3 rounded hover:bg-gray-700 flex items-center"
          >
            <FaArrowRight className="mr-2" />
            Prescription
          </button>
          <button
            onClick={() => navigate('/view-patients')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Patients
          </button>
        </div>
      </div>

      {/* Medical Records List */}
      <ul>
        {medicalRecords.length > 0 ? (
          medicalRecords.map(record => (
            <li key={record.id} className="border rounded-lg p-3 mb-2 bg-gray-100">
              <p className="font-semibold">{record.date}</p>
              <p>{record.details}</p>
            </li>
          ))
        ) : (
          <p>No medical records found for this patient.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewMedicalRecords;
