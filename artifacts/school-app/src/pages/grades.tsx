import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Send, Filter, GraduationCap, TrendingUp, Trophy, AlertCircle, Star, BookOpen, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ASSIGNMENTS = [
  { id: "h1", name: "HW 1", weight: "5%", date: "Feb 10" },
  { id: "h2", name: "HW 2", weight: "5%", date: "Feb 17" },
  { id: "q1", name: "Quiz 1", weight: "15%", date: "Feb 24" },
  { id: "m1", name: "Midterm", weight: "25%", date: "Mar 05" },
  { id: "h3", name: "HW 3", weight: "5%", date: "Mar 12" },
  { id: "h4", name: "HW 4", weight: "5%", date: "Mar 19" },
  { id: "q2", name: "Quiz 2", weight: "15%", date: "Mar 26" },
  { id: "f1", name: "Final", weight: "25%", date: "Apr 15" },
];

const SUBJECTS = ["Mathematics", "Science", "English", "History", "Arts", "Physical Ed"];

const STUDENTS_RAW = [
  { name: "Emma Rodriguez", base: 94 },
  { name: "Ava Johnson", base: 91 },
  { name: "Isabella Thomas", base: 88 },
  { name: "Sophia Martinez", base: 85 },
  { name: "Charlotte Lee", base: 83 },
  { name: "Mia Harris", base: 81 },
  { name: "Olivia Davis", base: 79 },
  { name: "Amelia Hall", base: 77 },
  { name: "Benjamin White", base: 75 },
  { name: "William Taylor", base: 74 },
  { name: "Noah Smith", base: 72 },
  { name: "Ethan Walker", base: 71 },
  { name: "Lucas Martin", base: 68 },
  { name: "Liam Chen", base: 66 },
  { name: "James Anderson", base: 63 },
];

const seed = (n: number, s: number) => Math.min(100, Math.max(40, Math.round(n + (((s * 9301 + 49297) % 233280) / 233280) * 20 - 10)));

const STUDENT_GRADES = STUDENTS_RAW.map((s, si) => {
  const grades: Record<string, number> = {};
  let total = 0;
  ASSIGNMENTS.forEach((a, ai) => {
    const sc = seed(s.base, si * 17 + ai * 7);
    grades[a.id] = sc;
    total += sc * (parseInt(a.weight) / 100);
  });
  const subjectGrades: Record<string, number> = {};
  SUBJECTS.forEach((sub, subi) => { subjectGrades[sub] = seed(s.base, si * 13 + subi * 11); });
  return { name: s.name, grades, average: Math.round(total), subjectGrades };
}).sort((a, b) => a.name.localeCompare(b.name));

const classAverages: Record<string, number> = {};
ASSIGNMENTS.forEach(a => {
  classAverages[a.id] = Math.round(STUDENT_GRADES.reduce((acc, s) => acc + s.grades[a.id], 0) / STUDENT_GRADES.length);
});
const totalClassAvg = Math.round(STUDENT_GRADES.reduce((acc, s) => acc + s.average, 0) / STUDENT_GRADES.length);

const getGradeColor = (score: number) => {
  if (score >= 90) return "text-emerald-700 bg-emerald-50 border-emerald-100";
  if (score >= 80) return "text-blue-700 bg-blue-50 border-blue-100";
  if (score >= 70) return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-rose-700 bg-rose-50 border-rose-100";
};

const getLetter = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const getBadgeColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-rose-500';
};

const GRADE_DIST = [
  { letter: 'A (90–100)', count: STUDENT_GRADES.filter(s => s.average >= 90).length, color: '#10b981' },
  { letter: 'B (80–89)',  count: STUDENT_GRADES.filter(s => s.average >= 80 && s.average < 90).length, color: '#3b82f6' },
  { letter: 'C (70–79)',  count: STUDENT_GRADES.filter(s => s.average >= 70 && s.average < 80).length, color: '#f59e0b' },
  { letter: 'D (60–69)',  count: STUDENT_GRADES.filter(s => s.average >= 60 && s.average < 70).length, color: '#f97316' },
  { letter: 'F (< 60)',   count: STUDENT_GRADES.filter(s => s.average < 60).length, color: '#ef4444' },
];

const TREND_DATA = [
  { week: 'Week 1', avg: 79 }, { week: 'Week 2', avg: 81 }, { week: 'Week 3', avg: 80 },
  { week: 'Week 4', avg: 83 }, { week: 'Week 5', avg: 82 }, { week: 'Week 6', avg: 84 },
  { week: 'Week 7', avg: totalClassAvg },
];

const SUBJECT_AVG = SUBJECTS.map(sub => ({
  subject: sub.length > 6 ? sub.slice(0, 6) + '.' : sub,
  avg: Math.round(STUDENT_GRADES.reduce((acc, s) => acc + s.subjectGrades[sub], 0) / STUDENT_GRADES.length),
}));

export default function Grades() {
  const [tab, setTab] = useState('gradebook');

  return (
    <AppLayout activePage="grades" pageTitle="Grades & Reports">
      <div className="flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <Tabs value={tab} onValueChange={setTab} className="w-full sm:w-auto">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="gradebook" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">Grade Book</TabsTrigger>
              <TabsTrigger value="reportcards" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">Report Cards</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="bg-white border-slate-200 flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4 text-slate-500" />Export
            </Button>
            <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#152a45] text-white flex-1 sm:flex-none">
              <Send className="mr-2 h-4 w-4" />Send Reports
            </Button>
          </div>
        </div>

        {/* ───── GRADE BOOK TAB ───── */}
        {tab === 'gradebook' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            <Card className="xl:col-span-3 border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="pb-4 border-b border-slate-100 bg-white">
                <div className="flex flex-wrap gap-3 items-center">
                  <Select defaultValue="class8a">
                    <SelectTrigger className="w-[110px] h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class8a">8A</SelectItem>
                      <SelectItem value="class8b">8B</SelectItem>
                      <SelectItem value="class7a">7A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="math">
                    <SelectTrigger className="w-[150px] h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="term2">
                    <SelectTrigger className="w-[120px] h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term1">Fall Term</SelectItem>
                      <SelectItem value="term2">Spring Term</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" className="text-slate-500 ml-auto hidden sm:flex">
                    <Filter className="h-4 w-4 mr-1" />Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    <TableRow className="border-slate-200">
                      <TableHead className="w-[180px] font-bold text-slate-700 bg-slate-50 sticky left-0 z-20 shadow-[inset_-1px_0_0_#e2e8f0]">Student</TableHead>
                      {ASSIGNMENTS.map(a => (
                        <TableHead key={a.id} className="text-center min-w-[72px] p-2">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-slate-800 text-xs">{a.name}</span>
                            <span className="text-[10px] text-slate-500 bg-white px-1 py-0.5 rounded border border-slate-200 mt-0.5">{a.weight}</span>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center min-w-[90px] font-bold text-slate-800 bg-slate-100 sticky right-0 z-20 shadow-[inset_1px_0_0_#e2e8f0]">Avg</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {STUDENT_GRADES.map(student => (
                      <TableRow key={student.name} className="hover:bg-sky-50/30 border-slate-100 group">
                        <TableCell className="font-medium text-slate-700 bg-white group-hover:bg-sky-50/30 sticky left-0 z-10 shadow-[inset_-1px_0_0_#e2e8f0] text-sm">{student.name}</TableCell>
                        {ASSIGNMENTS.map(a => {
                          const score = student.grades[a.id];
                          return (
                            <TableCell key={a.id} className="text-center p-1.5">
                              <div className={`mx-auto w-10 h-8 flex items-center justify-center rounded text-xs font-semibold border ${getGradeColor(score)}`}>{score}</div>
                            </TableCell>
                          );
                        })}
                        <TableCell className="text-center bg-slate-50 group-hover:bg-sky-50/50 sticky right-0 z-10 shadow-[inset_1px_0_0_#e2e8f0]">
                          <div className="flex items-center justify-center gap-1.5">
                            <span className="font-bold text-slate-800 text-sm">{student.average}%</span>
                            <Badge className={`px-1.5 py-0 text-[10px] ${getBadgeColor(student.average)}`}>{getLetter(student.average)}</Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-100 border-t-2 border-slate-300">
                      <TableCell className="font-bold text-slate-800 bg-slate-100 sticky left-0 z-10 shadow-[inset_-1px_0_0_#cbd5e1] text-sm">Class Avg</TableCell>
                      {ASSIGNMENTS.map(a => (
                        <TableCell key={a.id} className="text-center p-1.5">
                          <div className="mx-auto w-10 h-8 flex items-center justify-center rounded text-xs font-bold text-slate-700 bg-white border border-slate-300">{classAverages[a.id]}</div>
                        </TableCell>
                      ))}
                      <TableCell className="text-center bg-slate-200 sticky right-0 z-10 shadow-[inset_1px_0_0_#cbd5e1]">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="font-extrabold text-slate-900 text-sm">{totalClassAvg}%</span>
                          <Badge className={`px-1.5 py-0 text-[10px] ${getBadgeColor(totalClassAvg)}`}>{getLetter(totalClassAvg)}</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3 border-b border-slate-100"><CardTitle className="text-sm font-semibold text-slate-800">Class Summary</CardTitle></CardHeader>
                <CardContent className="p-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Class Average</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-slate-800">{totalClassAvg}%</h3>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                          <TrendingUp className="h-3 w-3 mr-0.5" />+2.4%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    {[
                      { icon: <Trophy className="h-3.5 w-3.5 text-amber-500" />, label: 'Highest', value: `${Math.max(...STUDENT_GRADES.map(s => s.average))}%` },
                      { icon: <AlertCircle className="h-3.5 w-3.5 text-rose-500" />, label: 'Lowest', value: `${Math.min(...STUDENT_GRADES.map(s => s.average))}%` },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">{s.icon}<span className="text-xs font-medium">{s.label}</span></div>
                        <p className="text-xl font-bold text-slate-800">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Pass Rate</span>
                      <span className="font-bold text-emerald-600">93.3%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93.3%' }} />
                    </div>
                    <p className="text-xs text-slate-400 text-center">14 of 15 students passing</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm bg-blue-50/50">
                <CardContent className="p-4 flex gap-3 items-start">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">Needs Attention</h4>
                    <p className="text-xs text-slate-600 mb-2 leading-snug"><span className="font-semibold">James Anderson</span> is at risk with a {Math.min(...STUDENT_GRADES.map(s => s.average))}% average.</p>
                    <Button size="sm" className="w-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 text-xs h-8">Schedule Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ───── REPORT CARDS TAB ───── */}
        {tab === 'reportcards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-slate-500">Spring Term 2026 · Class 8A · Mathematics</p>
              <Button variant="outline" size="sm" className="bg-white gap-2"><Download className="h-4 w-4" />Download All PDFs</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {STUDENT_GRADES.map(student => (
                <Card key={student.name} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Student header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{student.name}</p>
                        <p className="text-xs text-slate-400">Grade 8A · Spring 2026</p>
                      </div>
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${getBadgeColor(student.average)} text-white`}>
                        {getLetter(student.average)}
                      </div>
                    </div>
                    {/* Subject breakdown */}
                    <div className="space-y-2">
                      {SUBJECTS.map(sub => {
                        const score = student.subjectGrades[sub];
                        const pct = score;
                        return (
                          <div key={sub} className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-20 shrink-0 truncate">{sub}</span>
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: score >= 90 ? '#10b981' : score >= 80 ? '#3b82f6' : score >= 70 ? '#f59e0b' : '#ef4444' }} />
                            </div>
                            <span className={`text-xs font-bold w-8 text-right shrink-0 ${score >= 90 ? 'text-emerald-600' : score >= 80 ? 'text-blue-600' : score >= 70 ? 'text-amber-600' : 'text-rose-600'}`}>{score}</span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">Overall Average</p>
                        <p className="text-lg font-bold text-slate-800">{student.average}%</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-8 bg-white">View Full</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ───── ANALYTICS TAB ───── */}
        {tab === 'analytics' && (
          <div className="space-y-5">
            {/* Summary stat row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Class Average', value: `${totalClassAvg}%`, sub: 'Spring 2026', icon: GraduationCap, color: 'text-sky-600', bg: 'bg-sky-50' },
                { label: 'Top Performer', value: STUDENT_GRADES.slice().sort((a,b) => b.average - a.average)[0].name.split(' ')[0], sub: `${Math.max(...STUDENT_GRADES.map(s => s.average))}% avg`, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Pass Rate', value: '93.3%', sub: '14 of 15 students', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Subjects Tracked', value: '6', sub: 'this term', icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <Card key={s.label} className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                        <div className={`h-7 w-7 rounded-lg ${s.bg} flex items-center justify-center`}>
                          <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                        </div>
                      </div>
                      <p className="text-xl font-bold text-slate-800 truncate">{s.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Grade distribution */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3"><CardTitle className="text-sm font-semibold text-slate-800">Grade Distribution</CardTitle></CardHeader>
                <CardContent className="pt-5">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={GRADE_DIST} barSize={36}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="letter" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Students">
                        {GRADE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Class performance trend */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3"><CardTitle className="text-sm font-semibold text-slate-800">Class Average Trend</CardTitle></CardHeader>
                <CardContent className="pt-5">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={TREND_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                      <Tooltip formatter={(v: number) => [`${v}%`, 'Class Avg']} />
                      <Line type="monotone" dataKey="avg" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: '#0ea5e9', r: 4 }} name="Average" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Subject averages */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3"><CardTitle className="text-sm font-semibold text-slate-800">Average by Subject</CardTitle></CardHeader>
                <CardContent className="pt-5">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={SUBJECT_AVG} layout="vertical" barSize={16}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={50} />
                      <Tooltip formatter={(v: number) => [`${v}%`, 'Avg']} />
                      <Bar dataKey="avg" fill="#1e3a5f" radius={[0, 4, 4, 0]} name="Avg Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top & bottom performers */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3"><CardTitle className="text-sm font-semibold text-slate-800">Performance Ranking</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {STUDENT_GRADES.slice().sort((a, b) => b.average - a.average).map((s, i) => (
                      <div key={s.name} className="flex items-center gap-3 px-4 py-2.5">
                        <span className={`text-xs font-bold w-5 text-center shrink-0 ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-400' : 'text-slate-300'}`}>{i + 1}</span>
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="flex-1 text-sm text-slate-700 truncate">{s.name}</span>
                        <span className={`text-sm font-bold shrink-0 ${s.average >= 90 ? 'text-emerald-600' : s.average >= 80 ? 'text-blue-600' : s.average >= 70 ? 'text-amber-600' : 'text-rose-600'}`}>{s.average}%</span>
                        <Badge className={`text-[10px] px-1.5 py-0 shrink-0 ${getBadgeColor(s.average)}`}>{getLetter(s.average)}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
