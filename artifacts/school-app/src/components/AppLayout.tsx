import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, CalendarDays,
  Search, Bell, Menu, X, DollarSign, UserCheck, MessageSquare,
  Library, ClipboardCheck, BarChart3, Settings
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";

const NAV_GROUPS = [
  {
    label: "Academic",
    items: [
      { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'students', href: '/students', label: 'Students', icon: Users },
      { id: 'teachers', href: '/teachers', label: 'Teachers', icon: GraduationCap },
      { id: 'classes', href: '/classes', label: 'Classes', icon: BookOpen },
      { id: 'grades', href: '/grades', label: 'Grades', icon: ClipboardList },
      { id: 'calendar', href: '/calendar', label: 'Calendar', icon: CalendarDays },
      { id: 'attendance', href: '/attendance', label: 'Attendance', icon: UserCheck },
    ]
  },
  {
    label: "Management",
    items: [
      { id: 'finance', href: '/finance', label: 'Finance', icon: DollarSign },
      { id: 'admissions', href: '/admissions', label: 'Admissions', icon: ClipboardCheck },
      { id: 'library', href: '/library', label: 'Library', icon: Library },
      { id: 'messages', href: '/messages', label: 'Messages', icon: MessageSquare },
      { id: 'reports', href: '/reports', label: 'Reports', icon: BarChart3 },
      { id: 'settings', href: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export function AppLayout({ children, activePage, pageTitle }: { children: React.ReactNode, activePage?: string, pageTitle: string }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <div className="bg-sky-500/20 p-1.5 rounded-md mr-3">
          <GraduationCap className="h-5 w-5 text-sky-400" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">school.app</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto md:hidden text-white/60 hover:text-white p-1"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-0 overflow-y-auto px-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4 pt-4 border-t border-white/10' : ''}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{group.label}</p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = location.startsWith(item.href) || activePage === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      isActive
                        ? 'bg-sky-500/20 text-sky-300 shadow-inner'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 shrink-0 bg-black/10 mt-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white/10">
            <AvatarFallback className="bg-sky-600 text-white font-semibold">AU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-sm font-medium text-white truncate">Admin User</span>
            <span className="text-xs text-slate-400 truncate">Lincoln Elementary</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-[240px] bg-[#1e3a5f] text-white flex flex-col shadow-lg
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex-shrink-0
        `}
      >
        <SidebarContent />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative w-48 md:w-72 hidden sm:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <Input
                type="search"
                placeholder="Search students, staff..."
                className="w-full bg-slate-100/50 border-slate-200 pl-9 h-10 text-sm focus-visible:ring-sky-500 focus-visible:ring-offset-0 focus-visible:border-sky-500 rounded-full transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-sky-200 transition-all">
                <AvatarFallback className="bg-sky-100 text-sky-700 font-semibold text-xs">AU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-slate-50/50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
