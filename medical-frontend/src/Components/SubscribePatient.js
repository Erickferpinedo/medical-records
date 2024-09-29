import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SubscribePatient = () => {
  const { patientId } = useParams(); // Get patient ID from URL params
  const [prescription, setPrescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate prescription
    if (!prescription.trim()) {
      setError('Prescription details cannot be empty.');
      return;
    }

    try {
      // Handle the submission of the prescription to the server here
      // For example: await submitPrescription(patientId, prescription);
      
      // Notify user of successful submission (you can replace this with a toast)
      alert(`Prescription for Patient ${patientId} submitted successfully!`);

      // Navigate back to the medical records after submission
      navigate(`/view-patients`);
    } catch (error) {
      setError('Failed to submit prescription. Please try again later.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Prescription for Patient ID: {patientId}</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold">
          Prescription:
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full mt-1"
            rows="5"
            placeholder="Enter prescription details here"
            required
            aria-required="true"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Prescription
        </button>
      </form>
    </div>
  );
};

export default SubscribePatient;
