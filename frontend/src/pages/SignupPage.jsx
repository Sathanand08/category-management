import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log('State before signup call:', { email, password });

    setLoading(true); 
    setError(''); 

    try {
      const userData = await authService.signup(email, password);
      console.log('Signup Successful:', userData); 
      navigate('/dashboard');

    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Failed to sign up. Please try again.');
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg sm:w-full md:w-1/2 lg:w-1/3">
        <h3 className="text-2xl font-bold text-center">Create your account</h3>

        {error && (
          <div className="mt-4 text-center text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required 
                disabled={loading} 
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required 
                minLength="6" 
                disabled={loading} 
              />
            </div>

            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className={`w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                  loading ? 'opacity-50 cursor-not-allowed' : '' 
                }`}
                disabled={loading} 
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>

            <div className="mt-6 text-grey-dark text-center"> 
              Already have an account?
              <Link className="text-blue-600 hover:underline ml-1" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;