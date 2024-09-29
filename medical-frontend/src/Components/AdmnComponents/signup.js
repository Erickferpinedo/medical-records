import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password && role) {
      // Add signup logic here (e.g., sending data to backend)
      alert('Account created successfully!');
      navigate('/login');
    } else {
      alert('Please fill in all fields and select a role');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            >
              <option value="">Select a role</option>
              <option value="medic">Medical Specialist</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
