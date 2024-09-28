// src/Components/ViewPatients.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaArrowLeft, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ViewPatients = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate programmatically

  // Simulate fetching patient data from an API
  useEffect(() => {
    const fetchPatients = () => {
      const mockPatients = [
        { id: 1, name: 'John Doe', time: '10:00 AM', seen: false },
        { id: 2, name: 'Jane Smith', time: '11:00 AM', seen: false },
        { id: 3, name: 'Robert Johnson', time: '1:00 PM', seen: false },
        { id: 4, name: 'Alice Johnson', time: '9:30 AM', seen: false },
        { id: 5, name: 'Michael Thompson', time: '10:15 AM', seen: false },
        { id: 6, name: 'Sarah Lee', time: '11:45 AM', seen: false },
        { id: 7, name: 'David Martinez', time: '12:30 PM', seen: false },
        { id: 8, name: 'Emily Clark', time: '2:00 PM', seen: false },
        { id: 9, name: 'Brian Brown', time: '4:45 PM', seen: false }
      ];
      setPatients(mockPatients);
    };
    fetchPatients();
  }, [selectedDate]);

  // Handle marking patient as "seen"
  const handleMarkAsSeen = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, seen: true } : patient
      )
    );
  };

  // Handle undoing the mark as seen
  const handleUndoMarkAsSeen = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, seen: false } : patient
      )
    );
  };

  // Handle viewing medical records
  const handleViewMedicalRecords = (patientId) => {
    navigate(`/view-medical-records/${patientId}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold">View Patients for {selectedDate.toDateString()}</h3>
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard?role=medic')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Calendar Component */}
      <div className="mb-5">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="border rounded-lg shadow"
        />
      </div>

      {/* Patient List */}
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li
              key={patient.id}
              className={`flex justify-between items-center p-3 mb-2 border rounded-lg shadow ${
                patient.seen ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div>
                <p className="font-semibold">{patient.name}</p>
                <p>{patient.time}</p>
              </div>
              <div>
                {patient.seen ? (
                  <button
                    onClick={() => handleUndoMarkAsSeen(patient.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    <FaUndo />
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => handleMarkAsSeen(patient.id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Mark as Seen
                    </button>
                    <button
                      onClick={() => handleViewMedicalRecords(patient.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      View Medical Records
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No patients found for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewPatients;
