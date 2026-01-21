import { useState } from 'react';
import api from '../services/api';
import { User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
  
  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // NEW: Email field for registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    
    // Payload: If registering, include Email. Role is NO LONGER sent (Backend sets it).
    const payload = isRegistering 
      ? { username, password, email } 
      : { username, password };

    try {
      const res = await api.post(endpoint, payload);
      
      if (isRegistering) {
        alert('Registration successful! You can now log in as an Operator.');
        setIsRegistering(false); // Switch back to login mode
        setPassword(''); // Clear password for safety
      } else {
        // Login Success: Save token and notify App
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('username', res.data.username);
        onLogin(res.data.role, res.data.username);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isRegistering ? 'Join the ArtisElite WMS Platform' : 'Sign in to access your dashboard'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="text" required
                className="pl-10 block w-full rounded-lg border-slate-300 focus:ring-blue-500 focus:border-blue-500 py-2.5 bg-slate-50"
                placeholder="Enter your username"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field (Only show when Registering) */}
          {isRegistering && (
            <div className="animate-fade-in-down">
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" required
                  className="pl-10 block w-full rounded-lg border-slate-300 focus:ring-blue-500 focus:border-blue-500 py-2.5 bg-slate-50"
                  placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="password" required
                className="pl-10 block w-full rounded-lg border-slate-300 focus:ring-blue-500 focus:border-blue-500 py-2.5 bg-slate-50"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-[1.02]"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            {isRegistering ? 'Already have an account?' : 'New to the platform?'}
            <button 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setUsername(''); setPassword(''); setEmail(''); // Clear form
              }}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isRegistering ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}