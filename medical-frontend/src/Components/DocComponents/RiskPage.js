import { useLocation, useNavigate } from 'react-router-dom';

const RiskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve risks data from location state
  const risks = location.state?.risks || {}; // Use optional chaining to avoid errors

  // Log risks for debugging
  console.log('Risks:', risks, 'Type:', typeof risks);

  // Convert risks object to an array of entries
  const risksArray = Object.entries(risks); // Convert risks to array of [key, value] pairs

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Predicted Side Effects</h2>
      {risksArray.length > 0 ? (
        <ul className="list-disc pl-5">
          {risksArray.map(([risk, probability], index) => (
            <li key={index} className="mb-2 text-lg">
              {risk}: {probability.toFixed(2)}% {/* Display risk with its probability */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No risk data available for this medication.</p>
      )}
      <button
        onClick={() => navigate('/view-patients')}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default RiskPage;
