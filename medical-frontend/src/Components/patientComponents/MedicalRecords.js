import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate(); // Define navigate using useNavigate

  // Mock data to simulate fetching from an API
  const mockData = [
    {
      id: 1,
      date: '2024-09-01',
      doctor: 'Dr. John Smith',
      diagnosis: 'Hypertension',
      prescription: 'Lisinopril 10mg',
      notes: 'Monitor blood pressure regularly and follow a low-sodium diet.'
    },
    {
      id: 2,
      date: '2024-06-15',
      doctor: 'Dr. Emily Johnson',
      diagnosis: 'Type 2 Diabetes',
      prescription: 'Metformin 500mg',
      notes: 'Check blood sugar levels daily and maintain a balanced diet.'
    },
    {
      id: 3,
      date: '2024-03-22',
      doctor: 'Dr. Michael Brown',
      diagnosis: 'Seasonal Allergies',
      prescription: 'Cetirizine 10mg',
      notes: 'Take antihistamines as needed and avoid allergens.'
    }
  ];

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchMedicalRecords = async () => {
      // In a real-world scenario, you would use a fetch or axios call here, e.g.:
      // const response = await fetch('https://api.example.com/medical-records');
      // const data = await response.json();
      // setRecords(data);
      
      // Using mock data for demonstration
      setRecords(mockData);
    };

    fetchMedicalRecords();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Medical Records</h2>
        
        {records.length === 0 ? (
          <p className="text-center text-gray-600">No medical records found.</p>
        ) : (
          <ul className="space-y-4">
            {records.map((record) => (
              <li key={record.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Record Date: {record.date}</h3>
                  <span className="text-gray-600">Doctor: {record.doctor}</span>
                </div>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Prescription:</strong> {record.prescription}</p>
                <p><strong>Notes:</strong> {record.notes}</p>
              </li>
            ))}
          </ul>
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

export default MedicalRecords;
