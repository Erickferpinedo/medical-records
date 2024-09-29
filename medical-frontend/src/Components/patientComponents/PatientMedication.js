// src/PatientComponents/PatientMedications.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const PatientMedications = () => {
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const mockMedications = [
      {
        id: 1,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedBy: 'Dr. John Smith',
        startDate: '2024-01-01',
        endDate: 'Ongoing',
        instructions: 'Take in the morning with a glass of water.',
      },
      {
        id: 2,
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        prescribedBy: 'Dr. Emily Johnson',
        startDate: '2023-06-15',
        endDate: 'Ongoing',
        instructions: 'Take with meals to reduce stomach upset.',
      },
      {
        id: 3,
        name: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedBy: 'Dr. Michael Brown',
        startDate: '2023-03-22',
        endDate: 'As needed',
        instructions: 'Take in the evening if experiencing allergy symptoms.',
      },
    ];

    const fetchMedications = async () => {
      // Simulate fetching data from an API
      // In a real-world scenario, you would use a fetch or axios call here
      setMedications(mockMedications);
    };

    fetchMedications();
  }, []); // Now this is an empty array, avoiding unnecessary re-renders.

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Medications</h2>

        {medications.length === 0 ? (
          <p className="text-center text-gray-600">No medications found.</p>
        ) : (
          <ul className="space-y-4">
            {medications.map((medication) => (
              <li key={medication.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Medication: {medication.name}</h3>
                  <span className="text-gray-600">Prescribed by: {medication.prescribedBy}</span>
                </div>
                <p><strong>Dosage:</strong> {medication.dosage}</p>
                <p><strong>Frequency:</strong> {medication.frequency}</p>
                <p><strong>Start Date:</strong> {medication.startDate}</p>
                <p><strong>End Date:</strong> {medication.endDate}</p>
                <p><strong>Instructions:</strong> {medication.instructions}</p>
              </li>
            ))}
          </ul>
        )}
          <button 
          onClick={() => navigate('/dashboard?role=patient')}
          className=" flex flex-items  text-center bg-blue-600 text-white px-4 py-2 rounded mt-4 m-2 hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    
    </div>
  );
};

export default PatientMedications;
