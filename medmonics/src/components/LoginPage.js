import React, { useState } from 'react';
import { Brain, BookOpen, Edit } from 'lucide-react';

const LoginPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        await onSignup(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <Brain className="mx-auto h-16 w-16 text-blue-600" />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">MedMnemonics</h1>
          <p className="mt-2 text-lg text-gray-600">Your Medical Memory Companion</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* About Section */}
            <div className="bg-blue-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">About MedMnemonics</h2>
              <div className="space-y-4">
                <p>
                  MedMnemonics is a comprehensive library designed to help medical students and professionals 
                  master complex medical information through the power of memory techniques.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Extensive Library</h3>
                      <p className="text-blue-100 text-sm">Access hundreds of medical mnemonics across all specialties</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Brain className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Interactive Quizzes</h3>
                      <p className="text-blue-100 text-sm">Test your knowledge with flashcard-style quizzes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Edit className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Personalized Learning</h3>
                      <p className="text-blue-100 text-sm">Create and edit your own mnemonics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="p-8">
              <div className="mb-8">
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      !isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;