import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Welcome to TaskFlow
        </h1>
        <p className='italic text-center my-8'>The minimalist to do app to get you in the flow.</p>
        <div className="flex justify-between">
          <Link to="/login" className="btn btn-primary w-1/2 mr-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary w-1/2 mr-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
