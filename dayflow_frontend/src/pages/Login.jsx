import React, { useState } from 'react'; // <--- CHANGED THIS LINE
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE'); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('auth/login/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                        <span className="text-xl font-bold text-white">D</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome to Dayflow</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50" placeholder="john.doe@company.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50" placeholder="Enter your password" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sign in as</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50">
                            <option value="EMPLOYEE">Employee</option>
                            <option value="ADMIN">HR Officer / Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 font-medium">Sign in</button>
                </form>
                <div className="text-sm text-center text-gray-600">
                    Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
                </div>
            </div>
        </div>
    );
}