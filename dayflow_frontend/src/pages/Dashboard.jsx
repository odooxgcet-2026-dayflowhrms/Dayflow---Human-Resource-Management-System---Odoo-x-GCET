import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Users, Clock, Calendar, DollarSign, FileText, 
    User, LogOut, CheckCircle, AlertCircle, TrendingUp 
} from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch users. For hackathon speed, we just grab the first one found 
                // or the one matching the token if your backend filters it.
                const response = await api.get('users/'); 
                // Hack: If multiple users exist, find "me" or just pick the first one 
                // You can improve this later with a specific /me endpoint
                const me = response.data.find(u => u.username === localStorage.getItem('username')) || response.data[0];
                setUser(me || {}); 
                setLoading(false);
            } catch (error) {
                console.error("Auth Error", error);
                navigate('/');
            }
        };
        fetchUserData();
    }, [navigate]);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* --- SIDEBAR --- */}
            

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 ml-64">
                {/* Top Header */}
                <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-gray-500 text-sm">Welcome to Dayflow</h2>
                    <div className="flex items-center gap-6">
                        <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-red-100">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Check In
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800">{user.first_name} {user.last_name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role === 'ADMIN' ? 'HR Administrator' : 'Employee'}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {user.role === 'ADMIN' ? <HRDashboard /> : <EmployeeDashboard />}
                </div>
            </main>
        </div>
    );
}

// --- COMPONENT: EMPLOYEE DASHBOARD ---
function EmployeeDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, User! 👋</h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your work today.</p>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Today's Status" value="Present" icon={<CheckCircle className="text-green-500" />} sub="On Time" />
                <StatCard title="Work Hours" value="9h" icon={<Clock className="text-blue-500" />} />
                <StatCard title="Pending Leaves" value="2" icon={<Calendar className="text-purple-500" />} />
                <StatCard title="This Month" value="$73,000" icon={<DollarSign className="text-orange-500" />} />
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <ActivityItem time="09:00" title="Checked in today" status="On Time" color="green" />
                        <ActivityItem time="Yesterday" title="Leave request submitted" status="Pending approval" color="orange" />
                        <ActivityItem time="Dec 2025" title="Salary credited" status="Confirmed" color="blue" />
                    </div>
                </div>

                {/* Leave Balance */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Leave Balance</h3>
                    <div className="space-y-4">
                        <LeaveBar label="Annual Leave" used={5} total={20} color="bg-blue-500" />
                        <LeaveBar label="Sick Leave" used={2} total={10} color="bg-green-500" />
                        <LeaveBar label="Personal Leave" used={0} total={3} color="bg-purple-500" />
                    </div>
                    <button className="w-full mt-4 py-3 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Apply for Leave</button>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENT: HR DASHBOARD ---
function HRDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your organization's workforce</p>
            </div>

            {/* HR Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value="124" icon={<Users className="text-blue-500" />} trend="+2 this month" />
                <StatCard title="Present Today" value="118/124" icon={<CheckCircle className="text-green-500" />} trend="95% attendance" />
                <StatCard title="Pending Leaves" value="12" icon={<AlertCircle className="text-orange-500" />} trend="Requires review" />
                <StatCard title="Avg. Work Hours" value="8.5h" icon={<Clock className="text-purple-500" />} trend="+0.5h from last week" />
            </div>

            {/* HR Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Employees Table (Spans 2 columns) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Recent Employees</h3>
                        <button className="text-sm text-gray-500 hover:text-blue-600">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="pb-3 font-medium">Employee</th>
                                    <th className="pb-3 font-medium">Department</th>
                                    <th className="pb-3 font-medium">Position</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <EmployeeRow name="John Doe" id="EMP001" dept="Engineering" role="Software Engineer" />
                                <EmployeeRow name="Jane Smith" id="EMP002" dept="Marketing" role="Marketing Manager" />
                                <EmployeeRow name="Mike Johnson" id="EMP003" dept="Engineering" role="Senior Developer" />
                                <EmployeeRow name="Sarah Williams" id="EMP004" dept="Design" role="UI/UX Designer" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Leave Approvals List */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Leave Approvals</h3>
                    <div className="space-y-4">
                        <LeaveApprovalCard name="John Doe" type="Vacation Leave" date="Jan 20 - Jan 25" days="5 days" />
                        <LeaveApprovalCard name="Mike Johnson" type="Sick Leave" date="Jan 15" days="1 day" />
                    </div>
                </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-4">Department Overview</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DeptCard name="Engineering" count="45" pct="40%" />
                    <DeptCard name="Marketing" count="22" pct="20%" />
                    <DeptCard name="Sales" count="35" pct="30%" />
                    <DeptCard name="Design" count="12" pct="10%" />
                 </div>
            </div>
        </div>
    );
}

// --- HELPER COMPONENTS (Styles & Layouts) ---

function SidebarItem({ icon, text, active }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
            {icon}
            <span className="text-sm">{text}</span>
        </div>
    );
}

function StatCard({ title, value, icon, sub, trend }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            {(sub || trend) && (
                <div className="flex items-center gap-1 text-xs mt-2">
                    {trend ? <TrendingUp size={14} className="text-green-500"/> : null}
                    <span className={trend ? "text-green-600 font-medium" : "text-gray-400"}>{trend || sub}</span>
                </div>
            )}
        </div>
    );
}

function ActivityItem({ time, title, status, color }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full bg-${color}-500 mt-2`}></div>
                <div className="w-px h-full bg-gray-200 my-1"></div>
            </div>
            <div className="pb-4">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                <span className={`inline-block mt-2 px-2 py-1 bg-${color}-50 text-${color}-600 text-xs rounded border border-${color}-100`}>{status}</span>
            </div>
        </div>
    );
}

function LeaveBar({ label, used, total, color }) {
    const pct = (used / total) * 100;
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-500">{total - used} days left</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }}></div>
            </div>
        </div>
    );
}

function EmployeeRow({ name, id, dept, role }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="py-3">
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{id}</p>
            </td>
            <td className="py-3 text-gray-600">{dept}</td>
            <td className="py-3 text-gray-600">{role}</td>
            <td className="py-3"><span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded font-medium border border-green-100">Active</span></td>
        </tr>
    );
}

function LeaveApprovalCard({ name, type, date, days }) {
    return (
        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-medium text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{type}</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Pending</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{date} ({days})</p>
            <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-black text-white text-xs rounded hover:bg-gray-800">Approve</button>
                <button className="flex-1 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">Reject</button>
            </div>
        </div>
    );
}

function DeptCard({ name, count, pct }) {
    return (
        <div className="p-4 border border-gray-100 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500">{name}</h4>
            <p className="text-xl font-bold text-gray-900 mt-1">{count}</p>
            <p className="text-xs text-gray-400 mt-1">{pct} of total</p>
        </div>
    )
}