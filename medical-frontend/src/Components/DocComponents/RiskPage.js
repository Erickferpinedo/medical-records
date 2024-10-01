import { useLocation, useNavigate } from 'react-router-dom';

const RiskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely retrieve and parse risks data from localStorage
  const risks = JSON.parse(localStorage.getItem('risks')) || [];

  // Log risks for debugging


  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Predicted Side Effects</h2>
      {Array.isArray(risks) && risks.length > 0 ? (
        <ul className="list-disc pl-5">
          {risks.map((risk, index) => (
            <li key={index} className="mb-2 text-lg">
              {risk}
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
