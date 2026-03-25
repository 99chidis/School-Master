import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Users, CheckCircle2, Clock, XCircle, Plus, Search, ChevronRight } from 'lucide-react';

const APPLICANTS = [
  { id: 'APP-001', name: 'Sofia Reyes', grade: 'Grade 6', stage: 'Enrolled', date: 'Mar 10', docs: true, interview: true },
  { id: 'APP-002', name: 'Ethan Park', grade: 'Grade 9', stage: 'Accepted', date: 'Mar 18', docs: true, interview: true },
  { id: 'APP-003', name: 'Chloe Bennett', grade: 'Grade 3', stage: 'Accepted', date: 'Mar 19', docs: true, interview: true },
  { id: 'APP-004', name: 'Marcus Johnson', grade: 'Grade 7', stage: 'Under Review', date: 'Mar 21', docs: true, interview: false },
  { id: 'APP-005', name: 'Priya Sharma', grade: 'Grade 10', stage: 'Under Review', date: 'Mar 22', docs: false, interview: false },
  { id: 'APP-006', name: 'Ryan O\'Brien', grade: 'Grade 5', stage: 'Applied', date: 'Mar 23', docs: false, interview: false },
  { id: 'APP-007', name: 'Amelia Foster', grade: 'Grade 8', stage: 'Applied', date: 'Mar 24', docs: false, interview: false },
  { id: 'APP-008', name: 'Jackson Lee', grade: 'Grade 1', stage: 'Withdrawn', date: 'Mar 15', docs: true, interview: false },
];

const STAGES = ['Applied', 'Under Review', 'Accepted', 'Enrolled'] as const;
const STAGE_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode; count: string }> = {
  Applied:      { color: 'text-sky-700',     bg: 'bg-sky-50 border-sky-200',     icon: <ClipboardCheck className="h-4 w-4" />, count: '2' },
  'Under Review': { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: <Clock className="h-4 w-4" />,         count: '2' },
  Accepted:     { color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: <CheckCircle2 className="h-4 w-4" />, count: '2' },
  Enrolled:     { color: 'text-violet-700',  bg: 'bg-violet-50 border-violet-200',  icon: <Users className="h-4 w-4" />,       count: '1' },
};

const stageBadge: Record<string, string> = {
  Applied: 'bg-sky-100 text-sky-700',
  'Under Review': 'bg-amber-100 text-amber-700',
  Accepted: 'bg-emerald-100 text-emerald-700',
  Enrolled: 'bg-violet-100 text-violet-700',
  Withdrawn: 'bg-slate-100 text-slate-500',
};

export default function Admissions() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  const filtered = APPLICANTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout pageTitle="Admissions">
      <div className="flex flex-col gap-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Applicants', value: '47', sub: 'AY 2026–2027', icon: ClipboardCheck, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Under Review', value: '14', sub: 'awaiting decision', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Accepted', value: '22', sub: '46.8% acceptance rate', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Enrolled', value: '18', sub: 'confirmed this year', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
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

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search applicants..." className="pl-9 h-9 w-full bg-white" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-white">
              {(['kanban', 'table'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium capitalize transition ${view === v ? 'bg-[#1e3a5f] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white h-9 gap-2">
            <Plus className="h-4 w-4" />New Application
          </Button>
        </div>

        {/* Kanban */}
        {view === 'kanban' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {STAGES.map(stage => {
              const cfg = STAGE_CONFIG[stage];
              const applicants = filtered.filter(a => a.stage === stage);
              return (
                <div key={stage} className="flex flex-col gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${cfg.bg}`}>
                    <span className={cfg.color}>{cfg.icon}</span>
                    <span className={`text-sm font-semibold ${cfg.color}`}>{stage}</span>
                    <span className={`ml-auto text-xs font-bold ${cfg.color}`}>{applicants.length}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {applicants.map(a => (
                      <Card key={a.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {a.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                              <p className="text-xs text-slate-400">{a.grade}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Applied {a.date}</span>
                            <div className="flex gap-1">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${a.docs ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>Docs</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${a.interview ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>Interview</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {applicants.length === 0 && (
                      <div className="rounded-lg border-2 border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
                        No applicants
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        {view === 'table' && (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    {['Applicant', 'Grade', 'Applied', 'Documents', 'Interview', 'Stage', ''].map(h => (
                      <th key={h} className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {a.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{a.name}</p>
                            <p className="text-xs text-slate-400">{a.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{a.grade}</td>
                      <td className="px-5 py-3.5 text-slate-500">{a.date}</td>
                      <td className="px-5 py-3.5">
                        {a.docs ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-slate-300" />}
                      </td>
                      <td className="px-5 py-3.5">
                        {a.interview ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-slate-300" />}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${stageBadge[a.stage]}`}>{a.stage}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="text-xs text-sky-600 hover:underline font-medium flex items-center gap-1">
                          Review <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
