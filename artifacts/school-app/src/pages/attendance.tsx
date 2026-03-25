import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TREND_DATA = [
  { week: 'W1', rate: 96.2 }, { week: 'W2', rate: 94.8 }, { week: 'W3', rate: 97.1 },
  { week: 'W4', rate: 93.4 }, { week: 'W5', rate: 95.9 }, { week: 'W6', rate: 96.7 },
  { week: 'W7', rate: 94.2 }, { week: 'W8', rate: 97.5 },
];

const STUDENTS = [
  { name: 'Emma Rodriguez', id: 'STU-001', grade: '8A', mon: 'present', tue: 'present', wed: 'present', thu: 'present', fri: 'present', rate: 100 },
  { name: 'Liam Chen', id: 'STU-002', grade: '8A', mon: 'present', tue: 'late', wed: 'present', thu: 'present', fri: 'absent', rate: 88 },
  { name: 'Olivia Davis', id: 'STU-003', grade: '8A', mon: 'present', tue: 'present', wed: 'absent', thu: 'present', fri: 'present', rate: 92 },
  { name: 'Noah Smith', id: 'STU-004', grade: '8A', mon: 'absent', tue: 'absent', wed: 'present', thu: 'late', fri: 'present', rate: 74 },
  { name: 'Ava Johnson', id: 'STU-005', grade: '8A', mon: 'present', tue: 'present', wed: 'present', thu: 'present', fri: 'present', rate: 98 },
  { name: 'William Taylor', id: 'STU-006', grade: '8A', mon: 'late', tue: 'present', wed: 'present', thu: 'absent', fri: 'present', rate: 86 },
  { name: 'Sophia Martinez', id: 'STU-007', grade: '8A', mon: 'present', tue: 'present', wed: 'present', thu: 'present', fri: 'late', rate: 95 },
  { name: 'James Anderson', id: 'STU-008', grade: '8A', mon: 'absent', tue: 'present', wed: 'late', thu: 'present', fri: 'absent', rate: 71 },
  { name: 'Isabella Thomas', id: 'STU-009', grade: '8A', mon: 'present', tue: 'present', wed: 'present', thu: 'present', fri: 'present', rate: 99 },
  { name: 'Benjamin White', id: 'STU-010', grade: '8A', mon: 'present', tue: 'absent', wed: 'present', thu: 'present', fri: 'present', rate: 90 },
];

const LOW_ATTENDANCE = STUDENTS.filter(s => s.rate < 80);

const StatusCell = ({ status }: { status: string }) => {
  if (status === 'present') return <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />;
  if (status === 'absent') return <XCircle className="h-5 w-5 text-rose-500 mx-auto" />;
  return <Clock className="h-5 w-5 text-amber-500 mx-auto" />;
};

export default function Attendance() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri'] as const;
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <AppLayout pageTitle="Attendance">
      <div className="flex flex-col gap-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Present Today', value: '801', sub: 'of 847 students', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
            { label: 'Absent Today', value: '29', sub: '3.4% absence rate', color: 'text-rose-600', bg: 'bg-rose-50', icon: XCircle },
            { label: 'Late Arrivals', value: '17', sub: 'this morning', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
            { label: 'Low Attendance', value: '12', sub: 'students below 80%', color: 'text-violet-600', bg: 'bg-violet-50', icon: AlertTriangle },
          ].map(s => (
            <Card key={s.label} className="border-slate-200 shadow-sm">
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-xl font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Main Table */}
          <Card className="xl:col-span-2 border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="text-base font-semibold text-slate-800">Weekly Register</CardTitle>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-sm font-medium text-slate-700 px-2">Mar 23–27, 2026</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="8a">
                  <SelectTrigger className="w-[120px] h-8 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8a">Class 8A</SelectItem>
                    <SelectItem value="8b">Class 8B</SelectItem>
                    <SelectItem value="7a">Class 7A</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 bg-white"><Download className="h-4 w-4 mr-1" />Export</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Student</TableHead>
                    {dayLabels.map(d => <TableHead key={d} className="text-center font-semibold text-slate-700">{d}</TableHead>)}
                    <TableHead className="text-center font-semibold text-slate-700">Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STUDENTS.map(s => (
                    <TableRow key={s.id} className="hover:bg-slate-50/60">
                      <TableCell>
                        <div className="font-medium text-slate-800">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.id}</div>
                      </TableCell>
                      {days.map(d => (
                        <TableCell key={d} className="text-center"><StatusCell status={s[d]} /></TableCell>
                      ))}
                      <TableCell className="text-center">
                        <span className={`font-bold text-sm ${s.rate >= 95 ? 'text-emerald-600' : s.rate >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {s.rate}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Panel */}
          <div className="flex flex-col gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-sm font-semibold text-slate-800">Attendance Rate Trend</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={TREND_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[88, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Rate']} />
                    <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: '#0ea5e9', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm flex-1">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  Low Attendance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {LOW_ATTENDANCE.map(s => (
                    <div key={s.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.grade} · {s.id}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 font-bold">{s.rate}%</Badge>
                        <Button size="sm" variant="ghost" className="h-6 text-xs text-sky-600 hover:text-sky-800 p-0">Notify Parent</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
