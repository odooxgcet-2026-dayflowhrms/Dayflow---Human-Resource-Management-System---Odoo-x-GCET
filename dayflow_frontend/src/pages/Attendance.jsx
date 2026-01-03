import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Attendance() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
                    <p className="text-gray-500 text-sm">Monitor and manage employee attendance</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <AttStat label="Total Employees" value="5" icon={<User className="text-blue-500" />} />
                    <AttStat label="Present" value="3" icon={<CheckCircle className="text-green-500" />} />
                    <AttStat label="Absent" value="1" icon={<XCircle className="text-red-500" />} />
                    <AttStat label="On Leave" value="1" icon={<Clock className="text-yellow-500" />} />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-6">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Today's Attendance</button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Attendance History</button>
                </div>

                {/* Lists */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                    <div className="p-4 border-b bg-gray-50 font-medium text-gray-700 text-sm">Present Today (3)</div>
                    <AttRow name="John Doe" role="Software Engineer • EMP001" status="Present" color="green" />
                    <AttRow name="Mike Johnson" role="Senior Developer • EMP003" status="Present" color="green" />
                    <AttRow name="David Brown" role="Sales Executive • EMP005" status="Present" color="green" />
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 font-medium text-gray-700 text-sm">On Leave Today (1)</div>
                    <AttRow name="Jane Smith" role="Marketing Manager • EMP002" status="On Leave" color="yellow" />
                </div>
            </main>
        </div>
    );
}

function AttStat({ label, value, icon }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-xs font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        </div>
    );
}

function AttRow({ name, role, status, color }) {
    const badgeColors = { green: 'bg-green-500', yellow: 'bg-yellow-600' };
    return (
        <div className="p-4 flex justify-between items-center border-b last:border-0 hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">{name[0]}</div>
                <div>
                    <p className="font-medium text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${badgeColors[color]}`}>{status}</span>
        </div>
    );
}