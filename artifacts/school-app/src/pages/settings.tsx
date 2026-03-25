import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, CalendarDays, Users, Bell, Shield, Palette, Save, Plus, Trash2, Check } from 'lucide-react';

const TABS = [
  { id: 'school', label: 'School Profile', icon: School },
  { id: 'academic', label: 'Academic Year', icon: CalendarDays },
  { id: 'roles', label: 'User Roles', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const ROLES = [
  { name: 'Super Admin', users: 2, permissions: ['All access'], color: 'bg-red-100 text-red-700' },
  { name: 'Principal', users: 1, permissions: ['View all', 'Edit academics', 'View finance'], color: 'bg-violet-100 text-violet-700' },
  { name: 'Teacher', users: 52, permissions: ['View students', 'Edit grades', 'View attendance'], color: 'bg-sky-100 text-sky-700' },
  { name: 'Finance Officer', users: 3, permissions: ['Full finance', 'View students'], color: 'bg-amber-100 text-amber-700' },
  { name: 'Librarian', users: 2, permissions: ['Full library', 'View students'], color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Parent', users: 624, permissions: ['View own child', 'Messages'], color: 'bg-slate-100 text-slate-600' },
];

const NOTIF_SETTINGS = [
  { category: 'Academic', items: ['New grade posted', 'Assignment due reminder', 'Report card available'] },
  { category: 'Attendance', items: ['Student marked absent', 'Low attendance alert (below 80%)', 'Monthly attendance summary'] },
  { category: 'Finance', items: ['Payment received', 'Fee overdue reminder', 'Monthly financial summary'] },
  { category: 'Admissions', items: ['New application received', 'Application status change', 'Enrollment confirmation'] },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('school');
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_SETTINGS.flatMap(c => c.items.map(i => [i, true])))
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout pageTitle="Settings">
      <div className="flex gap-6">

        {/* Sidebar Nav */}
        <div className="w-[200px] shrink-0">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-2">
              <nav className="flex flex-col gap-0.5">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#1e3a5f] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* School Profile */}
          {activeTab === 'school' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-800">School Profile</CardTitle>
                <p className="text-sm text-slate-500">Basic information about your institution</p>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-6 pb-5 border-b border-slate-100">
                  <div className="h-20 w-20 rounded-2xl bg-[#1e3a5f] flex items-center justify-center">
                    <School className="h-10 w-10 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">School Logo</p>
                    <p className="text-xs text-slate-400 mb-3">Recommended: 200×200px PNG or SVG</p>
                    <Button variant="outline" size="sm" className="bg-white text-xs">Upload Logo</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'School Name', value: 'Lincoln Elementary School', placeholder: 'School name' },
                    { label: 'School Code', value: 'LES-2025', placeholder: 'Code' },
                    { label: 'Principal Name', value: 'Dr. James Harrington', placeholder: 'Principal' },
                    { label: 'Contact Email', value: 'admin@lincoln.edu', placeholder: 'Email' },
                    { label: 'Phone Number', value: '+1 (555) 234-5678', placeholder: 'Phone' },
                    { label: 'Website', value: 'www.lincolnelementary.edu', placeholder: 'Website' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">{f.label}</label>
                      <Input defaultValue={f.value} placeholder={f.placeholder} className="bg-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Address</label>
                  <Input defaultValue="124 Oak Street, Springfield, IL 62701" className="bg-white" />
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSave} className="gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white">
                    {saved ? <><Check className="h-4 w-4" />Saved!</> : <><Save className="h-4 w-4" />Save Changes</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Academic Year */}
          {activeTab === 'academic' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-800">Academic Year Configuration</CardTitle>
                  <p className="text-sm text-slate-500">Set terms, holidays, and grading periods</p>
                </div>
                <Button size="sm" className="gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white h-8">
                  <Plus className="h-3.5 w-3.5" />Add Term
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Academic Year Start</label>
                    <Input type="date" defaultValue="2025-09-01" className="bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Academic Year End</label>
                    <Input type="date" defaultValue="2026-06-30" className="bg-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { term: 'Term 1', start: 'Sep 1, 2025', end: 'Nov 28, 2025', status: 'Completed' },
                    { term: 'Term 2', start: 'Dec 1, 2025', end: 'Mar 27, 2026', status: 'Active' },
                    { term: 'Term 3', start: 'Apr 6, 2026', end: 'Jun 30, 2026', status: 'Upcoming' },
                  ].map(t => (
                    <div key={t.term} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{t.term}</p>
                        <p className="text-xs text-slate-400">{t.start} – {t.end}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : t.status === 'Completed' ? 'bg-slate-100 text-slate-500' : 'bg-sky-100 text-sky-700'}`}>
                          {t.status}
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 transition text-xs underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Grading Scale</label>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {[['A', '90–100'], ['B', '80–89'], ['C', '70–79'], ['D', '60–69'], ['F', '0–59']].map(([g, r]) => (
                      <div key={g} className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-2">
                        <p className="font-bold text-slate-800">{g}</p>
                        <p className="text-slate-400">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Roles */}
          {activeTab === 'roles' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-800">User Roles & Permissions</CardTitle>
                  <p className="text-sm text-slate-500">Manage access levels for each role</p>
                </div>
                <Button size="sm" className="gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white h-8">
                  <Plus className="h-3.5 w-3.5" />New Role
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {ROLES.map(r => (
                    <div key={r.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge className={`${r.color} border-0`}>{r.name}</Badge>
                        <span className="text-sm text-slate-500">{r.users} user{r.users !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5 flex-wrap justify-end">
                          {r.permissions.map(p => (
                            <span key={p} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{p}</span>
                          ))}
                        </div>
                        <button className="text-xs text-sky-600 hover:underline font-medium ml-2">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-800">Notification Preferences</CardTitle>
                <p className="text-sm text-slate-500">Control which alerts are sent to administrators</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {NOTIF_SETTINGS.map(cat => (
                  <div key={cat.category}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{cat.category}</p>
                    <div className="space-y-2">
                      {cat.items.map(item => (
                        <label key={item} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                          <span className="text-sm text-slate-700">{item}</span>
                          <button
                            onClick={() => setNotifs(prev => ({ ...prev, [item]: !prev[item] }))}
                            className={`relative h-5 w-9 rounded-full transition-colors ${notifs[item] ? 'bg-[#1e3a5f]' : 'bg-slate-300'}`}
                          >
                            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${notifs[item] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSave} className="gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white">
                    {saved ? <><Check className="h-4 w-4" />Saved!</> : <><Save className="h-4 w-4" />Save Preferences</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-800">Appearance</CardTitle>
                <p className="text-sm text-slate-500">Customize the look and feel of your portal</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Primary Color</p>
                  <div className="flex gap-3">
                    {['#1e3a5f', '#1a6b52', '#6b1a3a', '#5b4a1a', '#1a2f6b'].map(c => (
                      <button
                        key={c}
                        className={`h-10 w-10 rounded-xl border-2 transition ${c === '#1e3a5f' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Sidebar Style</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Dark', 'Light', 'Compact'].map(s => (
                      <div key={s} className={`border-2 rounded-xl p-3 text-center text-sm font-medium cursor-pointer transition ${s === 'Dark' ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 text-[#1e3a5f]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Language</p>
                  <select className="h-10 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white w-48">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Arabic</option>
                  </select>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSave} className="gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white">
                    {saved ? <><Check className="h-4 w-4" />Saved!</> : <><Save className="h-4 w-4" />Apply Changes</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
