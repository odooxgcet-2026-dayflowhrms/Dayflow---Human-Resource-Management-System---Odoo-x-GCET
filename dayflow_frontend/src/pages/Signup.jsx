import React, { useState } from 'react'; // <--- CHANGED THIS LINE
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ employee_id: '', first_name: '', last_name: '', email: '', company_name: '', password: '', confirm_password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const nextStep = (e) => {
        e.preventDefault();
        if (!formData.employee_id || !formData.first_name || !formData.last_name || !formData.email || !formData.company_name) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) return setError('Passwords do not match.');
        
        try {
            await api.post('auth/signup/', {
                username: formData.email, email: formData.email, password: formData.password,
                first_name: formData.first_name, last_name: formData.last_name,
                company_name: formData.company_name, employee_id: formData.employee_id
            });
            navigate('/');
        } catch (err) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg"><span className="text-xl font-bold text-white">D</span></div>
                </div>
                {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
                {step === 1 ? (
                    <>
                        <h2 className="text-2xl font-bold text-center">Create HR Account</h2>
                        <form onSubmit={nextStep} className="mt-6 space-y-4">
                            <input type="text" name="employee_id" placeholder="Employee ID" value={formData.employee_id} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" required />
                            <div className="flex gap-4">
                                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-1/2 p-3 border rounded bg-gray-50" required />
                                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-1/2 p-3 border rounded bg-gray-50" required />
                            </div>
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" required />
                            <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" required />
                            <button type="submit" className="w-full py-3 text-white bg-black rounded font-medium">Next</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center">Set Password</h2>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" required />
                            <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" required />
                            <div className="flex gap-4 mt-4">
                                <button onClick={() => setStep(1)} className="w-1/2 py-3 bg-gray-200 rounded">Back</button>
                                <button type="submit" className="w-1/2 py-3 text-white bg-black rounded">Sign Up</button>
                            </div>
                        </form>
                    </>
                )}
                 <div className="text-sm text-center text-gray-600 mt-4">Already have an account? <Link to="/" className="font-medium text-blue-600">Sign in</Link></div>
            </div>
        </div>
    );
}