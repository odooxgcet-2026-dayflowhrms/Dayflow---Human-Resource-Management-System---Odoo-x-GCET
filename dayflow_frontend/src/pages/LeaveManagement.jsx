import React from 'react';
import Sidebar from '../components/Sidebar';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function LeaveManagement() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
                    <p className="text-gray-500 text-sm">Review and manage employee leave requests</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <LeaveStat label="Total Requests" value="4" icon={<Calendar className="text-blue-500" />} />
                    <LeaveStat label="Pending" value="2" icon={<Clock className="text-yellow-500" />} />
                    <LeaveStat label="Approved" value="1" icon={<CheckCircle className="text-green-500" />} />
                    <LeaveStat label="Rejected" value="1" icon={<XCircle className="text-red-500" />} />
                </div>

                {/* Pending Requests */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Pending Requests (2)</h3>
                    <div className="space-y-4">
                        <LeaveRequestCard name="John Doe" date="2026-01-20" to="2026-01-25" reason="Family vacation" />
                        <LeaveRequestCard name="Mike Johnson" date="2026-01-15" to="2026-01-15" reason="Personal work" />
                    </div>
                </div>
            </main>
        </div>
    );
}

function LeaveStat({ label, value, icon }) {
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

function LeaveRequestCard({ name, date, to, reason }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{name[0]}</div>
                    <span className="font-bold text-sm">{name}</span>
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Pending</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2 pl-11">
                <p>From: <span className="text-gray-900">{date}</span></p>
                <p>To: <span className="text-gray-900">{to}</span></p>
            </div>
            <p className="text-sm text-gray-500 mt-1 pl-11">Reason: {reason}</p>
            <div className="mt-4 pl-11 flex gap-3">
                <button className="bg-black text-white px-4 py-1.5 rounded text-xs font-medium">Approve</button>
                <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-xs font-medium hover:bg-gray-50">Reject</button>
            </div>
        </div>
    );
}