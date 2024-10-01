// src/Components/DocComponents/PrescriptionRisk.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PrescriptionRisk = () => {
  const [riskData, setRiskData] = useState([]);

  useEffect(() => {
    // Mock data for prescription risk analysis (replace with real API call later)
    const mockRiskData = [
      {
        id: 1,
        medication: 'Lisinopril',
        riskLevel: 'Low',
        description: 'This medication has a low risk of causing side effects for most patients.',
      },
      {
        id: 2,
        medication: 'Metformin',
        riskLevel: 'Moderate',
        description: 'Moderate risk of gastrointestinal side effects like nausea or diarrhea.',
      },
      {
        id: 3,
        medication: 'Ibuprofen',
        riskLevel: 'High',
        description: 'High risk of stomach ulcers and kidney issues in patients with chronic use.',
      },
    ];

    setRiskData(mockRiskData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Prescription Risk Analysis</h2>

        {riskData.length === 0 ? (
          <p className="text-center text-gray-600">No risk data available.</p>
        ) : (
          <ul className="space-y-4">
            {riskData.map((risk) => (
              <li key={risk.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Medication: {risk.medication}</h3>
                  <span className="text-gray-600">Risk Level: {risk.riskLevel}</span>
                </div>
                <p>{risk.description}</p>
              </li>
            ))}
          </ul>
        )}
<div className='flex flex-row items'>
<div className="text-center mt-6">
          <Link to="/dashboard?role=medic" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
        <div className="text-center ml-6 mt-6">
          <Link to="/Patient-subscription/:patientId" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Prescription
          </Link>
        </div>
</div>
       
      </div>
    </div>
  );
};

export default PrescriptionRisk;
