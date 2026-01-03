import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, Calendar, DollarSign, FileText, User } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">D</div>
                <span className="text-xl font-bold text-gray-800">Dayflow</span>
            </div>

            <nav className="mt-6 px-4 space-y-2">
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" path="/dashboard" active={isActive('/dashboard')} />
                <SidebarItem icon={<Users size={20} />} text="Employees" path="/employees" active={isActive('/employees')} />
                <SidebarItem icon={<Clock size={20} />} text="Attendance" path="/attendance" active={isActive('/attendance')} />
                <SidebarItem icon={<Calendar size={20} />} text="Leave Management" path="/leaves" active={isActive('/leaves')} />
                <SidebarItem icon={<DollarSign size={20} />} text="Payroll" path="/payroll" active={isActive('/payroll')} />
                <SidebarItem icon={<FileText size={20} />} text="Reports" path="/reports" active={isActive('/reports')} />
            </nav>
        </aside>
    );
}

function SidebarItem({ icon, text, path, active }) {
    return (
        <Link to={path} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
            {icon}
            <span className="text-sm">{text}</span>
        </Link>
    );
}