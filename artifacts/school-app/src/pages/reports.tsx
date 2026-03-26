import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

type Period = '2023-2024' | '2024-2025' | '2025-2026';

const PERIOD_DATA: Record<Period, {
  stats: { label: string; value: string; change: string }[];
  attendance: { month: string; rate: number }[];
  gradeDistribution: { grade: string; count: number }[];
  deptPerformance: { dept: string; avg: number; target: number }[];
  feeCollection: { month: string; collected: number; target: number }[];
}> = {
  '2023-2024': {
    stats: [
      { label: 'Total Students', value: '789', change: '+5.5% YoY' },
      { label: 'Avg Grade Score', value: '79.2%', change: '+0.8% vs prior term' },
      { label: 'Attendance Rate', value: '93.8%', change: '-1.1% vs prior term' },
      { label: 'Fee Collection', value: '88.7%', change: 'of annual target' },
    ],
    attendance: [
      { month: 'Sep', rate: 95.0 }, { month: 'Oct', rate: 93.8 }, { month: 'Nov', rate: 92.5 },
      { month: 'Dec', rate: 91.0 }, { month: 'Jan', rate: 94.0 }, { month: 'Feb', rate: 94.9 }, { month: 'Mar', rate: 92.4 },
    ],
    gradeDistribution: [
      { grade: 'A', count: 172 }, { grade: 'B', count: 251 }, { grade: 'C', count: 220 }, { grade: 'D', count: 103 }, { grade: 'F', count: 43 },
    ],
    deptPerformance: [
      { dept: 'Math', avg: 74, target: 78 }, { dept: 'Science', avg: 79, target: 78 }, { dept: 'English', avg: 82, target: 78 },
      { dept: 'History', avg: 71, target: 78 }, { dept: 'Arts', avg: 87, target: 78 }, { dept: 'PE', avg: 85, target: 78 },
    ],
    feeCollection: [
      { month: 'Sep', collected: 128, target: 144 }, { month: 'Oct', collected: 135, target: 144 }, { month: 'Nov', collected: 130, target: 144 },
      { month: 'Dec', collected: 118, target: 144 }, { month: 'Jan', collected: 139, target: 144 }, { month: 'Feb', collected: 136, target: 144 }, { month: 'Mar', collected: 99, target: 144 },
    ],
  },
  '2024-2025': {
    stats: [
      { label: 'Total Students', value: '821', change: '+4.1% YoY' },
      { label: 'Avg Grade Score', value: '80.1%', change: '+0.9% vs prior term' },
      { label: 'Attendance Rate', value: '94.5%', change: '+0.7% vs prior term' },
      { label: 'Fee Collection', value: '90.4%', change: 'of annual target' },
    ],
    attendance: [
      { month: 'Sep', rate: 95.7 }, { month: 'Oct', rate: 94.2 }, { month: 'Nov', rate: 93.6 },
      { month: 'Dec', rate: 92.0 }, { month: 'Jan', rate: 95.1 }, { month: 'Feb', rate: 95.8 }, { month: 'Mar', rate: 93.1 },
    ],
    gradeDistribution: [
      { grade: 'A', count: 184 }, { grade: 'B', count: 265 }, { grade: 'C', count: 215 }, { grade: 'D', count: 99 }, { grade: 'F', count: 35 },
    ],
    deptPerformance: [
      { dept: 'Math', avg: 76, target: 79 }, { dept: 'Science', avg: 80, target: 79 }, { dept: 'English', avg: 84, target: 79 },
      { dept: 'History', avg: 72, target: 79 }, { dept: 'Arts', avg: 89, target: 79 }, { dept: 'PE', avg: 87, target: 79 },
    ],
    feeCollection: [
      { month: 'Sep', collected: 136, target: 150 }, { month: 'Oct', collected: 143, target: 150 }, { month: 'Nov', collected: 140, target: 150 },
      { month: 'Dec', collected: 129, target: 150 }, { month: 'Jan', collected: 147, target: 150 }, { month: 'Feb', collected: 144, target: 150 }, { month: 'Mar', collected: 107, target: 150 },
    ],
  },
  '2025-2026': {
    stats: [
      { label: 'Total Students', value: '847', change: '+3.2% YoY' },
      { label: 'Avg Grade Score', value: '81.4%', change: '+1.3% vs prior term' },
      { label: 'Attendance Rate', value: '95.1%', change: '+0.6% vs prior term' },
      { label: 'Fee Collection', value: '92.3%', change: 'of annual target' },
    ],
    attendance: [
      { month: 'Sep', rate: 96.4 }, { month: 'Oct', rate: 95.1 }, { month: 'Nov', rate: 94.8 },
      { month: 'Dec', rate: 93.2 }, { month: 'Jan', rate: 95.7 }, { month: 'Feb', rate: 96.3 }, { month: 'Mar', rate: 94.2 },
    ],
    gradeDistribution: [
      { grade: 'A', count: 198 }, { grade: 'B', count: 274 }, { grade: 'C', count: 211 }, { grade: 'D', count: 96 }, { grade: 'F', count: 28 },
    ],
    deptPerformance: [
      { dept: 'Math', avg: 78, target: 80 }, { dept: 'Science', avg: 82, target: 80 }, { dept: 'English', avg: 85, target: 80 },
      { dept: 'History', avg: 74, target: 80 }, { dept: 'Arts', avg: 91, target: 80 }, { dept: 'PE', avg: 88, target: 80 },
    ],
    feeCollection: [
      { month: 'Sep', collected: 142, target: 155 }, { month: 'Oct', collected: 151, target: 155 }, { month: 'Nov', collected: 148, target: 155 },
      { month: 'Dec', collected: 139, target: 155 }, { month: 'Jan', collected: 153, target: 155 }, { month: 'Feb', collected: 149, target: 155 }, { month: 'Mar', collected: 112, target: 155 },
    ],
  },
};

const ENROLLMENT = [
  { year: '2021', students: 712 },
  { year: '2022', students: 748 },
  { year: '2023', students: 789 },
  { year: '2024', students: 821 },
  { year: '2025', students: 847 },
];

const PIE_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#f97316', '#ef4444'];

const STAT_ICONS = [Users, BarChart3, TrendingUp, BookOpen];
const STAT_COLORS = [
  { color: 'text-sky-600', bg: 'bg-sky-50' },
  { color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { color: 'text-amber-600', bg: 'bg-amber-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
];

const REPORTS = [
  { name: 'End of Term Academic Report', type: 'Academic' },
  { name: 'Monthly Attendance Summary', type: 'Attendance' },
  { name: 'Q3 Financial Statement', type: 'Finance' },
  { name: 'Admissions Pipeline Report', type: 'Admissions' },
  { name: 'Library Utilization Report', type: 'Library' },
];

const typeColor: Record<string, string> = {
  Academic: 'bg-sky-100 text-sky-700',
  Attendance: 'bg-emerald-100 text-emerald-700',
  Finance: 'bg-amber-100 text-amber-700',
  Admissions: 'bg-violet-100 text-violet-700',
  Library: 'bg-rose-100 text-rose-700',
};

export default function Reports() {
  const [period, setPeriod] = useState<Period>('2025-2026');
  const data = PERIOD_DATA[period];

  return (
    <AppLayout pageTitle="Reports & Analytics">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {(['2023-2024', '2024-2025', '2025-2026'] as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${period === p ? 'bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >{p}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-white">
            <Download className="h-4 w-4" />Export All Reports
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.stats.map((s, i) => {
            const Icon = STAT_ICONS[i];
            const { color, bg } = STAT_COLORS[i];
            return (
              <Card key={s.label} className="border-slate-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
                    <div className={`h-8 w-8 rounded-lg ${bg} flex items-center justify-center shrink-0 ml-2`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-800 leading-tight">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment trend — always shows all years */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-800">Enrollment Trend</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-slate-500 p-1.5"><Download className="h-3.5 w-3.5" /></Button>
              </div>
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

          {/* Grade Distribution — period-sensitive */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-800">Grade Distribution · {period}</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-slate-500 p-1.5"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="pt-5 flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={180} className="sm:max-w-[160px] shrink-0">
                <PieChart>
                  <Pie data={data.gradeDistribution} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={72} innerRadius={38}>
                    {data.gradeDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 w-full">
                {data.gradeDistribution.map((g, i) => {
                  const total = data.gradeDistribution.reduce((s, d) => s + d.count, 0);
                  return (
                    <div key={g.grade} className="flex items-center gap-2 text-sm">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-slate-600 w-14 shrink-0">Grade {g.grade}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(g.count / total) * 100}%`, background: PIE_COLORS[i] }} />
                      </div>
                      <span className="font-medium text-slate-700 text-xs w-8 text-right shrink-0">{g.count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance — period-sensitive */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Monthly Attendance · {period}</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.attendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[89, 98]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'Rate']} />
                  <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} name="Attendance" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department performance — period-sensitive */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Dept Score vs Target · {period}</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.deptPerformance} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="dept" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[3, 3, 0, 0]} name="Target" />
                  <Bar dataKey="avg" fill="#1e3a5f" radius={[3, 3, 0, 0]} name="Avg Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Fee Collection chart — period-sensitive */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-800">Fee Collection vs Target (K) · {period}</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.feeCollection} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
                <Tooltip formatter={(v: number) => [`$${v}K`, '']} />
                <Bar dataKey="target" fill="#e2e8f0" radius={[3, 3, 0, 0]} name="Target" />
                <Bar dataKey="collected" fill="#0ea5e9" radius={[3, 3, 0, 0]} name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Saved Reports */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-800">Saved Reports · {period}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {REPORTS.map(r => (
                <div key={r.name} className="flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors flex-wrap gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${typeColor[r.type]}`}>{r.type}</span>
                    <span className="font-medium text-slate-700 text-sm truncate">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400">{period}</span>
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
