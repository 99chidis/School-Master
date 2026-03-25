import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

const ENROLLMENT = [
  { year: '2021', students: 712 },
  { year: '2022', students: 748 },
  { year: '2023', students: 789 },
  { year: '2024', students: 821 },
  { year: '2025', students: 847 },
];

const GRADE_DIST = [
  { grade: 'A', count: 198 },
  { grade: 'B', count: 274 },
  { grade: 'C', count: 211 },
  { grade: 'D', count: 96 },
  { grade: 'F', count: 28 },
];

const ATTENDANCE_TREND = [
  { month: 'Sep', rate: 96.4 },
  { month: 'Oct', rate: 95.1 },
  { month: 'Nov', rate: 94.8 },
  { month: 'Dec', rate: 93.2 },
  { month: 'Jan', rate: 95.7 },
  { month: 'Feb', rate: 96.3 },
  { month: 'Mar', rate: 94.2 },
];

const DEPT_PERFORMANCE = [
  { dept: 'Mathematics', avg: 78, target: 80 },
  { dept: 'Science', avg: 82, target: 80 },
  { dept: 'English', avg: 85, target: 80 },
  { dept: 'History', avg: 74, target: 80 },
  { dept: 'Arts', avg: 91, target: 80 },
  { dept: 'PE', avg: 88, target: 80 },
];

const FEE_COLLECTION = [
  { month: 'Sep', collected: 142, target: 155 },
  { month: 'Oct', collected: 151, target: 155 },
  { month: 'Nov', collected: 148, target: 155 },
  { month: 'Dec', collected: 139, target: 155 },
  { month: 'Jan', collected: 153, target: 155 },
  { month: 'Feb', collected: 149, target: 155 },
  { month: 'Mar', collected: 112, target: 155 },
];

const PIE_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#f97316', '#ef4444'];

const REPORTS = [
  { name: 'End of Term Academic Report', date: 'Mar 2026', type: 'Academic' },
  { name: 'Monthly Attendance Summary', date: 'Mar 2026', type: 'Attendance' },
  { name: 'Q3 Financial Statement', date: 'Mar 2026', type: 'Finance' },
  { name: 'Admissions Pipeline Report', date: 'Mar 2026', type: 'Admissions' },
  { name: 'Library Utilization Report', date: 'Mar 2026', type: 'Library' },
];

const typeColor: Record<string, string> = {
  Academic: 'bg-sky-100 text-sky-700',
  Attendance: 'bg-emerald-100 text-emerald-700',
  Finance: 'bg-amber-100 text-amber-700',
  Admissions: 'bg-violet-100 text-violet-700',
  Library: 'bg-rose-100 text-rose-700',
};

export default function Reports() {
  const [period, setPeriod] = useState('2025-2026');

  return (
    <AppLayout pageTitle="Reports & Analytics">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {['2023-2024', '2024-2025', '2025-2026'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${period === p ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >{p}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-white">
            <Download className="h-4 w-4" />Export All Reports
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '847', change: '+3.2% YoY', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Avg Grade Score', value: '81.4%', change: '+1.8% vs last term', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Attendance Rate', value: '95.1%', change: '-0.4% vs last term', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Fee Collection', value: '92.3%', change: 'of annual target', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map(s => (
            <Card key={s.label} className="border-slate-200 shadow-sm">
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-xl font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-800">Enrollment Trend</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-slate-500"><Download className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="pt-5">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={ENROLLMENT}>
                  <defs>
                    <linearGradient id="enroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[680, 880]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#enroll)" dot={{ fill: '#0ea5e9', r: 4 }} name="Students" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-800">Grade Distribution</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-slate-500"><Download className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="pt-5 flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={GRADE_DIST} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                    {GRADE_DIST.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1">
                {GRADE_DIST.map((g, i) => (
                  <div key={g.grade} className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-slate-600 w-8">Grade {g.grade}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(g.count / 807) * 100}%`, background: PIE_COLORS[i] }} />
                    </div>
                    <span className="font-medium text-slate-700 text-xs w-8 text-right">{g.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Monthly Attendance Rate (%)</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ATTENDANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[91, 98]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'Rate']} />
                  <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} name="Attendance" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Department Avg Score vs Target</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={DEPT_PERFORMANCE} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="dept" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[3,3,0,0]} name="Target" />
                  <Bar dataKey="avg" fill="#1e3a5f" radius={[3,3,0,0]} name="Avg Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Saved Reports */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-800">Saved Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {REPORTS.map(r => (
                <div key={r.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor[r.type]}`}>{r.type}</span>
                    <span className="font-medium text-slate-700 text-sm">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">{r.date}</span>
                    <button className="text-xs text-sky-600 hover:underline font-medium flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
