import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const STUDENTS = [
  { id: "STU-001", name: "Emma Rodriguez", grade: "5th Grade", class: "5A - Math", gpa: 3.8, attendance: 98, status: "Active", initials: "ER", color: "bg-blue-100 text-blue-700" },
  { id: "STU-002", name: "Liam Chen", grade: "8th Grade", class: "8C - Science", gpa: 2.4, attendance: 82, status: "Flagged", initials: "LC", color: "bg-emerald-100 text-emerald-700" },
  { id: "STU-003", name: "Olivia Davis", grade: "3rd Grade", class: "3B - English", gpa: 3.9, attendance: 99, status: "Active", initials: "OD", color: "bg-purple-100 text-purple-700" },
  { id: "STU-004", name: "Noah Smith", grade: "1st Grade", class: "1A - Gen Ed", gpa: 3.5, attendance: 95, status: "Active", initials: "NS", color: "bg-amber-100 text-amber-700" },
  { id: "STU-005", name: "Ava Johnson", grade: "7th Grade", class: "7B - History", gpa: 4.0, attendance: 100, status: "Active", initials: "AJ", color: "bg-rose-100 text-rose-700" },
  { id: "STU-006", name: "William Taylor", grade: "6th Grade", class: "6A - Math", gpa: 2.8, attendance: 88, status: "Active", initials: "WT", color: "bg-indigo-100 text-indigo-700" },
  { id: "STU-007", name: "Sophia Martinez", grade: "4th Grade", class: "4C - Art", gpa: 3.2, attendance: 92, status: "Active", initials: "SM", color: "bg-pink-100 text-pink-700" },
  { id: "STU-008", name: "James Anderson", grade: "8th Grade", class: "8A - PE", gpa: 2.1, attendance: 78, status: "Flagged", initials: "JA", color: "bg-cyan-100 text-cyan-700" },
  { id: "STU-009", name: "Isabella Thomas", grade: "2nd Grade", class: "2B - Gen Ed", gpa: 3.7, attendance: 96, status: "Active", initials: "IT", color: "bg-teal-100 text-teal-700" },
  { id: "STU-010", name: "Benjamin White", grade: "5th Grade", class: "5C - Science", gpa: 3.1, attendance: 85, status: "Active", initials: "BW", color: "bg-orange-100 text-orange-700" },
  { id: "STU-011", name: "Mia Harris", grade: "7th Grade", class: "7A - English", gpa: 3.9, attendance: 97, status: "Active", initials: "MH", color: "bg-fuchsia-100 text-fuchsia-700" },
  { id: "STU-012", name: "Lucas Martin", grade: "K", class: "KA - Gen Ed", gpa: 0.0, attendance: 45, status: "Inactive", initials: "LM", color: "bg-slate-100 text-slate-700" },
];

export default function Students() {
  return (
    <AppLayout activePage="students" pageTitle="Students Directory">
      <div className="flex flex-col gap-6">
        
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search students by name or ID..." 
                className="pl-9 h-10 w-full"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] h-10">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="k">Kindergarten</SelectItem>
                  <SelectItem value="1">1st Grade</SelectItem>
                  <SelectItem value="2">2nd Grade</SelectItem>
                  <SelectItem value="3">3rd Grade</SelectItem>
                  <SelectItem value="4">4th Grade</SelectItem>
                  <SelectItem value="5">5th Grade</SelectItem>
                  <SelectItem value="6">6th Grade</SelectItem>
                  <SelectItem value="7">7th Grade</SelectItem>
                  <SelectItem value="8">8th Grade</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="active">
                <SelectTrigger className="w-[130px] h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 md:hidden">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-slate-500">Total Students</p>
            <p className="text-2xl font-bold text-slate-800">847</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-emerald-500">
            <p className="text-sm font-medium text-slate-500">Active</p>
            <p className="text-2xl font-bold text-slate-800">821</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-sky-500">
            <p className="text-sm font-medium text-slate-500">New This Month</p>
            <p className="text-2xl font-bold text-slate-800">12</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-rose-500">
            <p className="text-sm font-medium text-slate-500">Flagged (At Risk)</p>
            <p className="text-2xl font-bold text-slate-800">5</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[280px]">
                    <Button variant="ghost" size="sm" className="-ml-3 h-8 font-semibold text-slate-600">
                      Student Name <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="-ml-3 h-8 font-semibold text-slate-600">
                      Grade <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell font-semibold text-slate-600">Homeroom / Class</TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" size="sm" className="ml-auto -mr-3 h-8 font-semibold text-slate-600">
                      GPA <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" size="sm" className="ml-auto -mr-3 h-8 font-semibold text-slate-600">
                      Attendance <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STUDENTS.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-sky-50/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={`text-xs font-semibold ${student.color}`}>
                            {student.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">{student.name}</span>
                          <span className="text-xs text-slate-500">{student.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">{student.grade}</TableCell>
                    <TableCell className="hidden md:table-cell text-slate-500">{student.class}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold ${
                        student.gpa >= 3.5 ? 'text-emerald-600' : 
                        student.gpa >= 2.5 ? 'text-slate-700' : 'text-rose-600'
                      }`}>
                        {student.gpa > 0 ? student.gpa.toFixed(1) : 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-semibold ${
                          student.attendance >= 95 ? 'text-emerald-600' : 
                          student.attendance >= 85 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {student.attendance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {student.status === 'Active' && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                      )}
                      {student.status === 'Flagged' && (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Flagged</Badge>
                      )}
                      {student.status === 'Inactive' && (
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4 text-slate-500" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4 text-slate-500" /> Edit Record
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-amber-600 focus:text-amber-600">
                            Message Parent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50/50">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">12</span> of <span className="font-semibold text-slate-800">847</span> results
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-sky-50 text-sky-700 border-sky-200">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
              <span className="text-slate-400 px-2">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8">71</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </AppLayout>
  );
}