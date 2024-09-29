import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const fetchToken = async (username, password) => {
    try {
      const response = await fetch('https://7454-131-94-186-14.ngrok-free.app/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'username': username,   // This should be the user's email or username
          'password': password,   // This should be the user's password
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
  
      const data = await response.json();
      console.log('Token:', data.access_token);
  
      // Save token to localStorage or state
      localStorage.setItem('authToken', JSON.stringify(data.access_token));;
      console.log(localStorage.getItem('authToken'));
      return data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };
  
  // Usage example
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password && role) {
      // This is just a sample, you should add authentication logic here
      const token = fetchToken(email, password);
      
      if (token) {
          navigate(`/dashboard?role=${role}`);
          localStorage.setItem('authToken', token);
         // localStorage.setItem('userId', id);
      }
      // navigate(`/dashboard?role=${role}`);
    } else {
      alert('Please fill in all fields and select a role');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
