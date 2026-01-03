import React from 'react';
import Sidebar from '../components/Sidebar';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

export default function Payroll() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
                    <p className="text-gray-500 text-sm">Manage employee salaries and payroll</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <PayStat label="Total Payroll" value="$390,000" icon={<DollarSign className="text-green-500" />} />
                    <PayStat label="Average Salary" value="$78,000" icon={<TrendingUp className="text-blue-500" />} />
                    <PayStat label="Employees" value="5" icon={<Users className="text-purple-500" />} />
                    <PayStat label="Pay Period" value="Monthly" icon={<Calendar className="text-orange-500" />} />
                </div>

                {/* Salaries List */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-6">Employee Salaries</h3>
                    <div className="space-y-4">
                        <PayRow name="John Doe" role="Software Engineer" dept="Engineering" salary="$85,000" id="EMP001" />
                        <PayRow name="Jane Smith" role="Marketing Manager" dept="Marketing" salary="$75,000" id="EMP002" />
                        <PayRow name="Mike Johnson" role="Senior Developer" dept="Engineering" salary="$95,000" id="EMP003" />
                        <PayRow name="Sarah Williams" role="UI/UX Designer" dept="Design" salary="$70,000" id="EMP004" />
                        <PayRow name="David Brown" role="Sales Executive" dept="Sales" salary="$65,000" id="EMP005" />
                    </div>
                </div>
            </main>
        </div>
    );
}

function PayStat({ label, value, icon }) {
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

function PayRow({ name, role, dept, salary, id }) {
    return (
        <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{name[0]}</div>
                <div>
                    <p className="font-bold text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{role} • {dept}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-bold text-gray-900">{salary}</p>
                    <p className="text-xs text-gray-500">{id}</p>
                </div>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-medium hover:bg-white bg-gray-50">Edit</button>
            </div>
        </div>
    );
}