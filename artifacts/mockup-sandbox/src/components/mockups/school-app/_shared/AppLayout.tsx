import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  ClipboardList, 
  CalendarDays,
  Search,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap },
  { id: 'classes', label: 'Classes', icon: BookOpen },
  { id: 'grades', label: 'Grades', icon: ClipboardList },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
];

export function AppLayout({ children, activePage, pageTitle }: { children: React.ReactNode, activePage: string, pageTitle: string }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] bg-[#1e3a5f] text-white flex flex-col flex-shrink-0 shadow-lg z-20 relative">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="bg-sky-500/20 p-1.5 rounded-md mr-3">
            <GraduationCap className="h-5 w-5 text-sky-400" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">school.app</span>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto px-3">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-sky-500/20 text-sky-300 shadow-inner' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            )
          })}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{pageTitle}</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-72 hidden sm:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <Input 
                type="search" 
                placeholder="Search students, staff..." 
                className="w-full bg-slate-100/50 border-slate-200 pl-9 h-10 text-sm focus-visible:ring-sky-500 focus-visible:ring-offset-0 focus-visible:border-sky-500 rounded-full transition-all" 
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white ring-0"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 mx-1"></div>
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-sky-200 transition-all">
                <AvatarFallback className="bg-sky-100 text-sky-700 font-semibold text-xs">AU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50/50 p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
