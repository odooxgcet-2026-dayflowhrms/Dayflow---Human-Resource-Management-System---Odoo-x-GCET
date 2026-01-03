import React from 'react';
import Sidebar from '../components/Sidebar'; // Import the shared sidebar
import { Search, Plus } from 'lucide-react';

export default function Employees() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                        <p className="text-gray-500 text-sm">View and manage employee information</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Plus size={16} /> Add Employee
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input type="text" placeholder="Search employees by name, ID, department..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatBox label="Total Employees" value="5" />
                    <StatBox label="Present Today" value="3" color="text-green-600" />
                    <StatBox label="On Leave" value="1" color="text-yellow-600" />
                    <StatBox label="Absent" value="1" color="text-red-600" />
                </div>

                {/* Employee Cards Grid */}
                <div className="grid grid-cols-4 gap-6">
                    <EmployeeCard name="John Doe" role="Software Engineer" id="EMP001" dept="Engineering" status="Present" statusColor="green" initial="J" />
                    <EmployeeCard name="Jane Smith" role="Marketing Manager" id="EMP002" dept="Marketing" status="On Leave" statusColor="yellow" initial="J" />
                    <EmployeeCard name="Mike Johnson" role="Senior Developer" id="EMP003" dept="Engineering" status="Present" statusColor="green" initial="M" />
                    <EmployeeCard name="Sarah Williams" role="UI/UX Designer" id="EMP004" dept="Design" status="Absent" statusColor="red" initial="S" />
                    <EmployeeCard name="David Brown" role="Sales Executive" id="EMP005" dept="Sales" status="Present" statusColor="green" initial="D" />
                </div>
            </main>
        </div>
    );
}

function StatBox({ label, value, color = "text-gray-900" }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <p className="text-gray-500 text-sm mb-1">{label}</p>
            <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
        </div>
    );
}

function EmployeeCard({ name, role, id, dept, status, statusColor, initial }) {
    const colors = { green: 'bg-green-50 text-green-700', yellow: 'bg-yellow-50 text-yellow-700', red: 'bg-red-50 text-red-700' };
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center relative">
            <span className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-${statusColor}-500`}></span>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">{initial}</div>
            <h3 className="font-bold text-gray-900">{name}</h3>
            <p className="text-xs text-gray-500 mb-1">{role}</p>
            <p className="text-xs text-gray-400 mb-4">{id}</p>
            <div className="text-xs text-gray-500 mb-4 text-center">
                <p>🏢 {dept}</p>
                <p>📍 San Francisco, CA</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[statusColor]}`}>{status}</span>
        </div>
    );
}
