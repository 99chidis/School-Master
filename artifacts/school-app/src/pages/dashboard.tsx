import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCheck,
  UserPlus,
  CalendarPlus,
  BellRing,
  FileBarChart2,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

const gradeData = [
  { grade: "A", count: 240, fill: "#10b981" },
  { grade: "B", count: 350, fill: "#3b82f6" },
  { grade: "C", count: 180, fill: "#f59e0b" },
  { grade: "D", count: 52, fill: "#f97316" },
  { grade: "F", count: 25, fill: "#ef4444" },
];

const recentActivity = [
  { id: 1, name: "Ms. Johnson", action: "submitted Final Grades for Math 101", time: "10 mins ago", type: "grade", initials: "SJ", color: "bg-purple-100 text-purple-700" },
  { id: 2, name: "Emma Rodriguez", action: "enrolled as a new student in Grade 5", time: "1 hr ago", type: "enrollment", initials: "ER", color: "bg-emerald-100 text-emerald-700" },
  { id: 3, name: "Mr. Thompson", action: "scheduled a Parent-Teacher meeting", time: "2 hrs ago", type: "meeting", initials: "DT", color: "bg-blue-100 text-blue-700" },
  { id: 4, name: "Admin Office", action: "sent out school-wide newsletter", time: "3 hrs ago", type: "notice", initials: "AO", color: "bg-slate-100 text-slate-700" },
  { id: 5, name: "Liam Chen", action: "marked absent (unexcused)", time: "5 hrs ago", type: "attendance", initials: "LC", color: "bg-rose-100 text-rose-700" },
  { id: 6, name: "Mrs. Davis", action: "updated History 202 syllabus", time: "Yesterday", type: "system", initials: "MD", color: "bg-orange-100 text-orange-700" },
];

const upcomingEvents = [
  { id: 1, title: "Midterm Exams Begin", date: "Mar 15", type: "exam" },
  { id: 2, title: "Staff Meeting", date: "Mar 18", type: "meeting" },
  { id: 3, title: "Spring Break", date: "Mar 22", type: "holiday" },
  { id: 4, title: "Parent Night", date: "Apr 05", type: "meeting" },
  { id: 5, title: "Science Fair", date: "Apr 12", type: "event" },
];

export default function Dashboard() {
  return (
    <AppLayout activePage="dashboard" pageTitle="Admin Dashboard">
      <div className="flex flex-col gap-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Users} 
            label="Total Students" 
            value="847" 
            trend="up" 
            trendValue="+12 this month"
            colorClass="text-blue-600"
            bgClass="bg-blue-100"
          />
          <StatCard 
            icon={GraduationCap} 
            label="Total Teachers" 
            value="52" 
            trend="neutral"
            trendValue="No change"
            colorClass="text-indigo-600"
            bgClass="bg-indigo-100"
          />
          <StatCard 
            icon={BookOpen} 
            label="Active Classes" 
            value="38" 
            trend="up"
            trendValue="+2 this term"
            colorClass="text-purple-600"
            bgClass="bg-purple-100"
          />
          <StatCard 
            icon={UserCheck} 
            label="Attendance Today" 
            value="94.2%" 
            trend="down"
            trendValue="-1.4% vs avg"
            colorClass="text-emerald-600"
            bgClass="bg-emerald-100"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Add Student
          </Button>
          <Button variant="outline" className="bg-white border-slate-200">
            <CalendarPlus className="mr-2 h-4 w-4 text-sky-600" /> Schedule Class
          </Button>
          <Button variant="outline" className="bg-white border-slate-200">
            <BellRing className="mr-2 h-4 w-4 text-amber-500" /> Send Notice
          </Button>
          <Button variant="outline" className="bg-white border-slate-200">
            <FileBarChart2 className="mr-2 h-4 w-4 text-emerald-600" /> Generate Report
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-sky-600 h-8">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-slate-50/50 transition-colors">
                    <Avatar className="h-10 w-10 border border-slate-100">
                      <AvatarFallback className={`text-xs font-semibold ${activity.color}`}>
                        {activity.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-slate-800 leading-snug">
                        <span className="font-semibold text-slate-900">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        {activity.time}
                        {activity.type === 'grade' && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events & Chart */}
          <div className="flex flex-col gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-800">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-100 shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold text-slate-800 leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
                      <div className="mt-1">
                        {event.type === 'exam' && <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] h-5 px-1.5">Exam</Badge>}
                        {event.type === 'meeting' && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] h-5 px-1.5">Meeting</Badge>}
                        {event.type === 'holiday' && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] h-5 px-1.5">Holiday</Badge>}
                        {event.type === 'event' && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] h-5 px-1.5">Event</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="w-full mt-2 text-sm text-sky-600">Open Calendar</Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Overall Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-2">
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        {gradeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}