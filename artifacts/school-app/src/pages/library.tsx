import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Plus, Download, RefreshCw, Clock, BookMarked, AlertCircle } from 'lucide-react';

const BOOKS = [
  { id: 'LIB-001', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', copies: 5, available: 3, location: 'A-12' },
  { id: 'LIB-002', title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', copies: 3, available: 0, location: 'C-04' },
  { id: 'LIB-003', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', copies: 4, available: 2, location: 'A-08' },
  { id: 'LIB-004', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', copies: 6, available: 4, location: 'D-17' },
  { id: 'LIB-005', title: 'Mathematics for High School', author: 'Various', genre: 'Textbook', copies: 30, available: 12, location: 'B-01' },
  { id: 'LIB-006', title: 'Animal Farm', author: 'George Orwell', genre: 'Fiction', copies: 8, available: 5, location: 'A-22' },
  { id: 'LIB-007', title: 'Introduction to Physics', author: 'Halliday & Resnick', genre: 'Textbook', copies: 20, available: 7, location: 'B-05' },
  { id: 'LIB-008', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', copies: 4, available: 1, location: 'A-30' },
];

const CHECKOUTS = [
  { student: 'Emma Rodriguez', book: 'The Great Gatsby', due: 'Mar 28, 2026', daysLeft: 3, avatar: 'ER' },
  { student: 'Liam Chen', book: 'Sapiens', due: 'Mar 26, 2026', daysLeft: 1, avatar: 'LC' },
  { student: 'Noah Smith', book: 'A Brief History of Time', due: 'Mar 20, 2026', daysLeft: -5, avatar: 'NS' },
  { student: 'Ava Johnson', book: 'Mathematics for High School', due: 'Apr 5, 2026', daysLeft: 11, avatar: 'AJ' },
  { student: 'William Taylor', book: 'Introduction to Physics', due: 'Mar 22, 2026', daysLeft: -3, avatar: 'WT' },
];

const genreColor: Record<string, string> = {
  Fiction: 'bg-violet-100 text-violet-700',
  Science: 'bg-sky-100 text-sky-700',
  History: 'bg-amber-100 text-amber-700',
  Textbook: 'bg-emerald-100 text-emerald-700',
};

export default function Library() {
  const [search, setSearch] = useState('');
  const filtered = BOOKS.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout pageTitle="Library">
      <div className="flex flex-col gap-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Books', value: '1,248', sub: 'across 6 genres', icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Checked Out', value: '186', sub: 'currently borrowed', icon: BookMarked, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Overdue Returns', value: '14', sub: '14 students notified', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Due This Week', value: '38', sub: 'returning by Mar 27', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
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

          {/* Book Catalog */}
          <Card className="xl:col-span-2 border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <CardTitle className="text-base font-semibold text-slate-800">Book Catalog</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search title or author..."
                      className="pl-9 h-9 w-52 bg-white"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white h-9 gap-2">
                    <Plus className="h-4 w-4" />Add Book
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    {['Title', 'Author', 'Genre', 'Location', 'Copies', 'Available', ''].map(h => (
                      <th key={h} className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-800">{b.title}</p>
                        <p className="text-xs text-slate-400">{b.id}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{b.author}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${genreColor[b.genre] ?? 'bg-slate-100 text-slate-600'}`}>{b.genre}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{b.location}</td>
                      <td className="px-5 py-3.5 text-center text-slate-600 font-medium">{b.copies}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`font-bold ${b.available === 0 ? 'text-rose-600' : b.available <= 2 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {b.available}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2">
                          <button className="text-xs text-sky-600 hover:underline font-medium">Checkout</button>
                          <button className="text-xs text-slate-400 hover:underline">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Active Checkouts */}
          <div className="flex flex-col gap-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-800">Active Checkouts</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-white">
                  <Download className="h-3.5 w-3.5" />Export
                </Button>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-slate-100">
                {CHECKOUTS.map(c => (
                  <div key={c.student} className="p-4 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 text-xs font-bold shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm truncate">{c.student}</p>
                      <p className="text-xs text-slate-500 truncate">{c.book}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-slate-400">Due: {c.due}</span>
                        <span className={`text-xs font-semibold flex items-center gap-1 ${c.daysLeft < 0 ? 'text-rose-600' : c.daysLeft <= 2 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {c.daysLeft < 0
                            ? <><AlertCircle className="h-3 w-3" />{Math.abs(c.daysLeft)}d overdue</>
                            : <><Clock className="h-3 w-3" />{c.daysLeft}d left</>}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-[#1e3a5f] to-[#1a4a7a] text-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-4 w-4 text-sky-300" />
                  <p className="text-sm font-semibold text-sky-200">Quick Actions</p>
                </div>
                <div className="space-y-2">
                  {['Record Return', 'Send Overdue Reminders', 'Add New Books', 'Generate Catalog Report'].map(a => (
                    <button key={a} className="w-full text-left text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition">{a}</button>
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
