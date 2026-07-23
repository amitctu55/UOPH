import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an actual API call
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Redirect would happen here in a real app
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <h1 className="mb-4 text-3xl font-extrabold text-slate-900">
            Sign in to UPCHAR
          </h1>
          <p className="text-slate-600">
            Access your account to manage your healthcare journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-ring-offset-2 font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-4">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember-me" className="text-slate-600">
                  Remember me
                </label>
              </div>
            </div>

            <div className="text-sm">
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up for an account
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Signing in...</span>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Successfully signed in!</h3>
                  <p className="mt-1 text-sm text-green-600">
                    Redirecting to your dashboard...
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-mdium">Invalid credentials</h3>
                  <p className="mt-1 text-sm text-red-600">
                    Please check your email and password and try again.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="relative text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white px-2">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-4">
          <button
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22.46 6c-1.77.35-3.55.58-5.27.69a4.3 4.3 0 00-1.24-2.12c-.38.65-.96 1.2-1.68 1.56a8.55 8.55 0 01-2.9 1.19c-.34-.41-.71-.79-1.1-1.06a13.94 13.94 0 00-7.02 4.34c-3.58 1.49-6.34 2.98-6.34 5.14A11.69 11.69 0 005 16.21c0 .33.03.65.09.95a4.37 4.37 0 01-2.13-.54v.05a4.37 4.37 0 003.5 4.29c-.21.08-.43.14-.65.16a4.38 4.38 0 004.04 3.04 8.85 8.85 0 01-7.98-.3v.05a4.37 4.37 0 004.37 4.37c2.39 0 4.48-1.36 5.59-3.43a10.8 10.8 0 001.65-.24h-.02c-.28.79-.89 2.08-1.79 3.26a8.57 8.57 0 01-3.33 1.5c-.24-.07-.49-.11-.74-.16v.05a4.37 4.37 0 001.31 3.63c.9-.07 1.75-.2 2.48-.45a11.75 11.75 0 017 3.12c-.19.53-.37 1-.49 1.42a11.77 11.77 0 01-5.59 2.27A16.04 16.04 0 0013 20.18c-3.33 1.83-6.11 2.32-7.53 1.42a11.92 11.92 0 006.16-1.91 11.9 11.9 0 003.13-.54c-.65-.35-1.2-.76-1.62-1.29z" clipRule="evenodd" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </main>
  );
}