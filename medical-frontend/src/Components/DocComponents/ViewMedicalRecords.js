import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewMedicalRecords = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    // If no patientId, redirect to view patients
    if (!patientId) {
      navigate('/view-patients');
      return;
    }

    // Simulate fetching medical records based on patient ID
    const fetchMedicalRecords = () => {
      const mockRecords = [
        { id: 1, patientId: 1, date: '2024-09-01', details: 'Annual checkup, all good.' },
        { id: 2, patientId: 1, date: '2024-08-15', details: 'Flu symptoms, prescribed medication.' },
        { id: 3, patientId: 2, date: '2024-09-10', details: 'Follow-up appointment, no issues.' },
        { id: 4, patientId: 3, date: '2024-09-05', details: 'Blood test, results normal.' },
        { id: 5, patientId: 4, date: '2024-09-12', details: 'Allergy testing completed.' },
      ];
      const patientRecords = mockRecords.filter(record => record.patientId === Number(patientId));
      setMedicalRecords(patientRecords);
    };

    fetchMedicalRecords();
  }, [patientId, navigate]);

  // Button handlers for redirection
  const goToDashboard = () => navigate('/dashboard?role=medic');
  const goToSubscription = () => navigate('/Patient-subscription/:patientId');

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      {medicalRecords.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold">Medical Records for Patient ID: {patientId}</h3>
          <ul>
            {medicalRecords.map(record => (
              <li key={record.id} className="border rounded-lg p-3 mb-2 bg-gray-100">
                <p className="font-semibold">{record.date}</p>
                <p>{record.details}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No medical records found for this patient or invalid patient ID.</p>
      )}
      
      {/* Buttons for navigation */}
      <div className="mt-5">
        <button
          onClick={goToDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
        <button
          onClick={goToSubscription}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700"
        >
          Go to Subscription Page
        </button>
    
      </div>
    </div>
  );
};

export default ViewMedicalRecords;
