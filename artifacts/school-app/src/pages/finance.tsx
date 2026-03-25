import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Search, Download, Plus, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const REVENUE_DATA = [
  { month: 'Sep', collected: 142000, expected: 155000 },
  { month: 'Oct', collected: 148000, expected: 155000 },
  { month: 'Nov', collected: 151000, expected: 155000 },
  { month: 'Dec', collected: 139000, expected: 155000 },
  { month: 'Jan', collected: 153000, expected: 155000 },
  { month: 'Feb', collected: 149000, expected: 155000 },
  { month: 'Mar', collected: 112000, expected: 155000 },
];

const EXPENSE_DATA = [
  { category: 'Salaries', amount: 98000, budget: 100000 },
  { category: 'Facilities', amount: 18500, budget: 20000 },
  { category: 'Technology', amount: 7200, budget: 8000 },
  { category: 'Supplies', amount: 4100, budget: 5000 },
  { category: 'Events', amount: 2800, budget: 4000 },
  { category: 'Library', amount: 1500, budget: 2000 },
];

const FEE_RECORDS = [
  { id: 'STU-001', name: 'Emma Rodriguez', grade: '8A', fee: 2400, paid: 2400, due: 0, status: 'paid', lastPayment: 'Mar 1' },
  { id: 'STU-002', name: 'Liam Chen', grade: '7B', fee: 2400, paid: 1200, due: 1200, status: 'partial', lastPayment: 'Jan 15' },
  { id: 'STU-003', name: 'Olivia Davis', grade: '9A', fee: 2400, paid: 2400, due: 0, status: 'paid', lastPayment: 'Feb 28' },
  { id: 'STU-004', name: 'Noah Smith', grade: '6C', fee: 2400, paid: 0, due: 2400, status: 'overdue', lastPayment: 'Never' },
  { id: 'STU-005', name: 'Ava Johnson', grade: '8A', fee: 2400, paid: 2400, due: 0, status: 'paid', lastPayment: 'Mar 3' },
  { id: 'STU-006', name: 'William Taylor', grade: '10B', fee: 2400, paid: 1800, due: 600, status: 'partial', lastPayment: 'Feb 10' },
  { id: 'STU-007', name: 'Sophia Martinez', grade: '7A', fee: 2400, paid: 0, due: 2400, status: 'overdue', lastPayment: 'Never' },
  { id: 'STU-008', name: 'James Anderson', grade: '8B', fee: 2400, paid: 2400, due: 0, status: 'paid', lastPayment: 'Mar 5' },
  { id: 'STU-009', name: 'Isabella Thomas', grade: '9B', fee: 2400, paid: 2400, due: 0, status: 'paid', lastPayment: 'Feb 20' },
  { id: 'STU-010', name: 'Benjamin White', grade: '6A', fee: 2400, paid: 600, due: 1800, status: 'overdue', lastPayment: 'Oct 12' },
];

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  paid: { label: 'Paid', icon: <CheckCircle2 className="h-3.5 w-3.5" />, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  partial: { label: 'Partial', icon: <Clock className="h-3.5 w-3.5" />, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  overdue: { label: 'Overdue', icon: <XCircle className="h-3.5 w-3.5" />, className: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function Finance() {
  const [search, setSearch] = useState('');
  const filtered = FEE_RECORDS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout pageTitle="Finance & Billing">
      <div className="flex flex-col gap-6">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Collected', value: '$994,000', sub: 'This academic year', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Outstanding', value: '$87,600', sub: '37 students pending', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Monthly Budget', value: '$155,000', sub: 'Mar 2026 allocated', icon: TrendingUp, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Monthly Expenses', value: '$132,100', sub: '85.2% of budget used', icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((s) => (
            <Card key={s.label} className="border-slate-200 shadow-sm">
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">{s.label}</p>
                  <p className="text-lg font-bold text-slate-800 leading-tight">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="fees">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="fees">Fee Collection</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="fees" className="mt-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-base font-semibold text-slate-800">Student Fee Status</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative flex-1 min-w-[160px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="Search student..." className="pl-9 h-9 w-full bg-white" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[120px] h-9 bg-white shrink-0"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white h-9 shrink-0"><Plus className="h-4 w-4 mr-2" />Add Record</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-semibold text-slate-700">Student</TableHead>
                      <TableHead className="font-semibold text-slate-700">Grade</TableHead>
                      <TableHead className="text-right font-semibold text-slate-700">Annual Fee</TableHead>
                      <TableHead className="text-right font-semibold text-slate-700">Paid</TableHead>
                      <TableHead className="text-right font-semibold text-slate-700">Outstanding</TableHead>
                      <TableHead className="font-semibold text-slate-700">Last Payment</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r) => {
                      const cfg = statusConfig[r.status];
                      return (
                        <TableRow key={r.id} className="hover:bg-slate-50/60">
                          <TableCell>
                            <div className="font-medium text-slate-800">{r.name}</div>
                            <div className="text-xs text-slate-400">{r.id}</div>
                          </TableCell>
                          <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{r.grade}</Badge></TableCell>
                          <TableCell className="text-right font-medium text-slate-700">${r.fee.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium text-emerald-700">${r.paid.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-semibold text-rose-600">{r.due > 0 ? `$${r.due.toLocaleString()}` : '—'}</TableCell>
                          <TableCell className="text-slate-500 text-sm">{r.lastPayment}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`flex items-center gap-1 w-fit ${cfg.className}`}>
                              {cfg.icon} {cfg.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 text-sky-600 hover:text-sky-800 hover:bg-sky-50 text-xs">
                              {r.status === 'paid' ? 'Receipt' : 'Record Payment'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-800">Monthly Fee Collection vs Target</CardTitle>
                <Button variant="outline" size="sm" className="h-8 bg-white"><Download className="h-4 w-4 mr-2" />Export</Button>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={REVENUE_DATA} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                    <Bar dataKey="expected" fill="#e2e8f0" radius={[4,4,0,0]} name="Target" />
                    <Bar dataKey="collected" fill="#0ea5e9" radius={[4,4,0,0]} name="Collected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-base font-semibold text-slate-800">March 2026 Expenditure</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Category</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Spent</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Budget</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Usage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {EXPENSE_DATA.map((e) => {
                        const pct = Math.round((e.amount / e.budget) * 100);
                        return (
                          <TableRow key={e.category} className="hover:bg-slate-50/60">
                            <TableCell className="font-medium text-slate-800">{e.category}</TableCell>
                            <TableCell className="text-right text-slate-700">${e.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-slate-400">${e.budget.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${pct >= 90 ? 'text-rose-600' : pct >= 75 ? 'text-amber-600' : 'text-emerald-600'}`}>{pct}%</span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-base font-semibold text-slate-800">Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={EXPENSE_DATA} layout="vertical" barSize={18}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                      <Bar dataKey="budget" fill="#e2e8f0" radius={[0,4,4,0]} name="Budget" />
                      <Bar dataKey="amount" fill="#1e3a5f" radius={[0,4,4,0]} name="Spent" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
