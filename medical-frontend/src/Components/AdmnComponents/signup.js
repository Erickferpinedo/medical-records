import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');  // Added state for first name
  const [lastName, setLastName] = useState('');  // Added state for last name
  const navigate = useNavigate();

  const createUser = async (userData) => {
    try {
      const response = await fetch('https://7454-131-94-186-14.ngrok-free.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Sending data in JSON format
        },
        body: JSON.stringify(userData),  // Convert the user data to JSON
      });
  
      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);
      }
  
      const data = await response.json();  // Parse the JSON response
      console.log('User created successfully:', data);
  
      return data;  // Return the created user data
    } catch (error) {
      console.error('Error during signup:', error);
      return null;
    }
  };
  
  // Example of how to call the function
  
  
  // Call the function to create a user
  
  
  const handleSignup = async (e) => {
    e.preventDefault();
    if (name && lastName && email && password && role) {
      // Add signup logic here (e.g., sending data to backend)
      const userData = {
        first_name: name,
        last_name: lastName,
        email: email,
        password: password,
        role: role
      }; // Call fetchToken here
      if (createUser(userData)){
        navigate(`/`);      }
      
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
            <label className="block text-gray-600 mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>
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
              <option value="health_official">Medical Specialist</option>
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
        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
