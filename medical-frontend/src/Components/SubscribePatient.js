import React, { useState } from 'react';

const SubscribePatient = () => {
  const [medication, setMedication] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const handleInputChange = (e) => {
    setMedication(e.target.value);
  };

  const handleSubscribe = () => {
    if (medication) {
      setPrescriptions((prevPrescriptions) => [...prevPrescriptions, medication]);
      setMedication(''); 
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <h3 className="text-2xl font-bold mb-3">Subscribe Patient Medications</h3>
      <textarea
        className="border border-gray-300 p-2 w-full rounded"
        rows="4"
        placeholder="Type the medication here..."
        value={medication}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSubscribe}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
      >
        Subscribe Medication
      </button>

      <div className="mt-5">
        <h4 className="text-xl font-semibold">Subscribed Medications:</h4>
        <ul>
          {prescriptions.map((prescription, index) => (
            <li key={index} className="mt-1">
              - {prescription}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscribePatient;
