import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubscribePatient = () => {
  const { patientId } = useParams(); // Get patient ID from URL params
  const [prescription, setPrescription] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const predictMedicationSideEffects = async (medication: string) => {
    try {
      const response = await fetch('https://7454-131-94-186-14.ngrok-free.app/ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ med: medication }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Predicted Side Effects:', data);
    } catch (error) {
      setApiError('Failed to predict medication side effects.');
      console.error('Error during fetch:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setApiError('');

    // Validate prescription input
    if (!prescription.trim()) {
      setError('Prescription details cannot be empty.');
      return;
    }

    // Predict side effects after validation
    await predictMedicationSideEffects(prescription);

    try {
      // Example of handling the submission of the prescription
      // await submitPrescription(patientId, prescription);

      alert(`Prescription for Patient ${patientId} submitted successfully!`);
      navigate(`/view-patients`); // Navigate back to the patient list
    } catch (error) {
      setError('Failed to submit prescription. Please try again later.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Prescription for Patient ID: {patientId}</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {apiError && <p className="text-red-600 mb-4">{apiError}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold">
          Prescription:
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full mt-1"
            rows={5}
            placeholder="Enter prescription details here"
            required
            aria-required="true"
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Prescription
        </button>
        <button
          type="button"
          onClick={() => navigate('/prescription-risk')}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 m-2 hover:bg-blue-700"
        >
          View Prescription Risks
        </button>
      </form>
    </div>
  );
};

export default SubscribePatient;
