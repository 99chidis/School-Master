import React from 'react';
import { AppLayout } from './_shared/AppLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone,
  BookOpen,
  CalendarDays,
  MoreVertical
} from 'lucide-react';

const TEACHERS = [
  { id: 1, name: "Mr. Thompson", subject: "Mathematics", classes: 8, years: 12, status: "Full-time", initials: "DT", color: "bg-blue-600", image: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: 2, name: "Ms. Johnson", subject: "English Lit", classes: 6, years: 4, status: "Full-time", initials: "SJ", color: "bg-emerald-600", image: "https://i.pravatar.cc/150?u=a042581f4e29026703d" },
  { id: 3, name: "Mrs. Davis", subject: "History", classes: 5, years: 8, status: "Part-time", initials: "MD", color: "bg-purple-600", image: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
  { id: 4, name: "Dr. Roberts", subject: "Science (Biology)", classes: 7, years: 15, status: "Department Head", initials: "AR", color: "bg-rose-600", image: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
  { id: 5, name: "Coach Martinez", subject: "Physical Education", classes: 12, years: 3, status: "Full-time", initials: "CM", color: "bg-amber-600", image: "https://i.pravatar.cc/150?u=a092581d4ef9026700d" },
  { id: 6, name: "Mr. Lee", subject: "Computer Science", classes: 4, years: 2, status: "Full-time", initials: "JL", color: "bg-cyan-600", image: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
  { id: 7, name: "Ms. Garcia", subject: "Art & Design", classes: 6, years: 7, status: "Full-time", initials: "MG", color: "bg-pink-600", image: "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
  { id: 8, name: "Mr. Wilson", subject: "Music", classes: 5, years: 9, status: "Part-time", initials: "MW", color: "bg-indigo-600", image: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
  { id: 9, name: "Mrs. Clark", subject: "Spanish", classes: 7, years: 5, status: "Full-time", initials: "EC", color: "bg-teal-600", image: "https://i.pravatar.cc/150?u=a042581f4e29026703b" },
];

const DEPARTMENTS = [
  { dept: "Mathematics", head: "Mr. Thompson", staff: 6, courses: 24 },
  { dept: "Sciences", head: "Dr. Roberts", staff: 8, courses: 32 },
  { dept: "Humanities", head: "Mrs. Davis", staff: 12, courses: 45 },
  { dept: "Arts & Electives", head: "Ms. Garcia", staff: 9, courses: 28 },
  { dept: "Physical Ed.", head: "Coach Martinez", staff: 4, courses: 15 },
];

export function Teachers() {
  return (
    <AppLayout activePage="teachers" pageTitle="Teacher Directory">
      <div className="flex flex-col gap-6">
        
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search teachers..." 
                className="pl-9 h-10 w-full bg-white border-slate-200 shadow-sm"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] h-10 bg-white">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="pe">Physical Ed.</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white w-full sm:w-auto shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TEACHERS.map((teacher) => (
            <Card key={teacher.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-16 bg-slate-100/80 border-b border-slate-100 flex justify-end p-2 relative">
                <div className={`absolute left-6 -bottom-8 p-1 bg-white rounded-xl shadow-sm border border-slate-100`}>
                  <Avatar className="h-14 w-14 rounded-lg rounded-tl-lg">
                    <AvatarImage src={teacher.image} alt={teacher.name} className="object-cover" />
                    <AvatarFallback className={`${teacher.color} text-white font-bold text-lg rounded-lg`}>
                      {teacher.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 bg-white/50 backdrop-blur-sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="pt-10 pb-5 px-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-sky-700 transition-colors">{teacher.name}</h3>
                    <p className="text-sm font-medium text-sky-600 mt-0.5">{teacher.subject}</p>
                  </div>
                  {teacher.status === 'Department Head' ? (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-xs">Dept Head</Badge>
                  ) : teacher.status === 'Part-time' ? (
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">Part-time</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 text-xs">Full-time</Badge>
                  )}
                </div>
                
                <div className="flex gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100">
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{teacher.classes}</span> Classes
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{teacher.years}</span> Yrs Tenure
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <Button variant="outline" className="flex-1 h-9 border-slate-200 hover:bg-slate-50 text-slate-600 text-xs">
                    <Mail className="mr-2 h-3.5 w-3.5" /> Email
                  </Button>
                  <Button variant="outline" className="flex-1 h-9 border-slate-200 hover:bg-slate-50 text-slate-600 text-xs">
                    <Phone className="mr-2 h-3.5 w-3.5" /> Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Staff Overview Table */}
        <div className="mt-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Staff Overview by Department</h2>
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Department</TableHead>
                  <TableHead className="font-semibold text-slate-700">Department Head</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">Teaching Staff</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">Total Courses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEPARTMENTS.map((dept, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-slate-800">{dept.dept}</TableCell>
                    <TableCell className="text-slate-600">{dept.head}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold">{dept.staff}</Badge>
                    </TableCell>
                    <TableCell className="text-center text-slate-600">{dept.courses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
        
      </div>
    </AppLayout>
  );
}
