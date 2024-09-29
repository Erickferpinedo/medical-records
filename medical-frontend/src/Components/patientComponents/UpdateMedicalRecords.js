import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadMedicalRecords = () => {
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  // Function to update medical history
  const updateMedicalHistory = async (updatedData, token) => {
    try {
      const response = await fetch(`https://7454-131-94-186-14.ngrok-free.app/users/medicalhistory`, {
        method: 'POST',  // Use POST for creating a new record
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the JWT token for authentication
        },
        body: JSON.stringify(updatedData),  // Send the updated medical history data as JSON
      });

      console.log('Response Status:', response.status); // Log the status
      console.log('Response Body:', await response.text()); // Log the body for more info

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // More informative error message
      }

      const data = await response.json();  // Parse the response JSON
      console.log('Medical history updated successfully:', data);
      return data;  // Return the updated data
    } catch (error) {
      console.error('Error updating medical history:', error.message); // Log the error message
      console.error('Error stack:', error.stack); // Log the error stack for more context
      return null;
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('authToken'); // Get token from local storage
    console.log(token);
    if (description && token) {
      const currentDate = new Date(); // Get the current date
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      const updatedData = {
        date: formattedDate, // Use the formatted date
        details: description, // Use the description as the updated medical record details
      };

      const result = await updateMedicalHistory(updatedData, token); // Call the update function without userId

      if (result) {
        setUploadStatus('Upload successful!'); // Set upload status as success
        setDescription(''); // Reset the description
      } else {
        setUploadStatus('Failed to update medical history.'); // Set upload status as failure
      }
    } else {
      setUploadStatus('Please provide a description.'); // Alert if description is missing
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Medical Records</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Brief description of the medical record before the visit"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Upload Record
        </button>
        {uploadStatus && (
          <p className={`mt-4 text-center ${uploadStatus === 'Upload successful!' ? 'text-green-600' : 'text-red-600'}`}>
            {uploadStatus}
          </p>
        )}
        <button 
          onClick={() => navigate('/dashboard?role=patient')}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UploadMedicalRecords;
