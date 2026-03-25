import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, MapPin, Users, LayoutGrid, List } from 'lucide-react';

const TIME_SLOTS = [
  "8:00 AM", "8:45 AM", "9:30 AM", "10:15 AM", "11:00 AM", 
  "11:45 AM", "12:30 PM", "1:15 PM", "2:00 PM", "2:45 PM"
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Subject color mapping
const SUBJECT_COLORS = {
  Math: "bg-blue-100 border-blue-200 text-blue-800",
  English: "bg-emerald-100 border-emerald-200 text-emerald-800",
  Science: "bg-orange-100 border-orange-200 text-orange-800",
  History: "bg-purple-100 border-purple-200 text-purple-800",
  PE: "bg-rose-100 border-rose-200 text-rose-800",
  Art: "bg-amber-100 border-amber-200 text-amber-800",
  Music: "bg-cyan-100 border-cyan-200 text-cyan-800",
  Lunch: "bg-slate-100 border-slate-200 text-slate-500",
};

// Mock schedule data (dayIndex, slotIndex, data)
const SCHEDULE_DATA = [
  // Monday
  { day: 0, slot: 0, span: 1, subject: "Math", title: "Algebra I", teacher: "Thompson", room: "101" },
  { day: 0, slot: 1, span: 1, subject: "English", title: "Literature", teacher: "Johnson", room: "204" },
  { day: 0, slot: 2, span: 2, subject: "Science", title: "Biology Lab", teacher: "Roberts", room: "Lab A" },
  { day: 0, slot: 4, span: 1, subject: "Lunch", title: "Lunch Break", teacher: "-", room: "Cafeteria" },
  { day: 0, slot: 5, span: 1, subject: "History", title: "World History", teacher: "Davis", room: "302" },
  { day: 0, slot: 6, span: 1, subject: "PE", title: "Physical Ed", teacher: "Martinez", room: "Gym" },
  { day: 0, slot: 7, span: 2, subject: "Art", title: "Studio Art", teacher: "Garcia", room: "Art Rm" },
  
  // Tuesday
  { day: 1, slot: 0, span: 1, subject: "English", title: "Literature", teacher: "Johnson", room: "204" },
  { day: 1, slot: 1, span: 1, subject: "Math", title: "Algebra I", teacher: "Thompson", room: "101" },
  { day: 1, slot: 2, span: 1, subject: "History", title: "World History", teacher: "Davis", room: "302" },
  { day: 1, slot: 3, span: 1, subject: "Music", title: "Band", teacher: "Wilson", room: "Music Rm" },
  { day: 1, slot: 4, span: 1, subject: "Lunch", title: "Lunch Break", teacher: "-", room: "Cafeteria" },
  { day: 1, slot: 5, span: 2, subject: "Science", title: "Biology", teacher: "Roberts", room: "305" },
  { day: 1, slot: 7, span: 1, subject: "Math", title: "Study Hall", teacher: "Thompson", room: "101" },
  
  // Wednesday
  { day: 2, slot: 0, span: 2, subject: "Science", title: "Biology Lab", teacher: "Roberts", room: "Lab A" },
  { day: 2, slot: 2, span: 1, subject: "PE", title: "Health", teacher: "Martinez", room: "105" },
  { day: 2, slot: 3, span: 1, subject: "Math", title: "Algebra I", teacher: "Thompson", room: "101" },
  { day: 2, slot: 4, span: 1, subject: "Lunch", title: "Lunch Break", teacher: "-", room: "Cafeteria" },
  { day: 2, slot: 5, span: 1, subject: "English", title: "Literature", teacher: "Johnson", room: "204" },
  { day: 2, slot: 6, span: 1, subject: "History", title: "World History", teacher: "Davis", room: "302" },
  { day: 2, slot: 7, span: 1, subject: "Art", title: "Digital Art", teacher: "Garcia", room: "Comp Lab" },
];

const TODAY_CLASSES = [
  { time: "8:00 AM - 8:45 AM", title: "Algebra I", subject: "Math", room: "Room 101", teacher: "Mr. Thompson", enrolled: 24 },
  { time: "8:45 AM - 9:30 AM", title: "Literature", subject: "English", room: "Room 204", teacher: "Ms. Johnson", enrolled: 22 },
  { time: "9:30 AM - 11:00 AM", title: "Biology Lab", subject: "Science", room: "Lab A", teacher: "Dr. Roberts", enrolled: 18 },
  { time: "11:45 AM - 12:30 PM", title: "World History", subject: "History", room: "Room 302", teacher: "Mrs. Davis", enrolled: 26 },
  { time: "12:30 PM - 1:15 PM", title: "Physical Ed", subject: "PE", room: "Gymnasium", teacher: "Coach Martinez", enrolled: 30 },
];

export default function Classes() {
  const [view, setView] = useState("grid");

  // Helper to find class in grid
  const getClassForCell = (dayIdx: number, slotIdx: number) => {
    return SCHEDULE_DATA.find(c => c.day === dayIdx && c.slot === slotIdx);
  };
  
  // Helper to check if cell is spanned over
  const isCellSpanned = (dayIdx: number, slotIdx: number) => {
    return SCHEDULE_DATA.some(c => c.day === dayIdx && c.slot < slotIdx && c.slot + c.span > slotIdx);
  };

  return (
    <AppLayout activePage="classes" pageTitle="Class Schedule">
      <div className="flex flex-col gap-6 h-full">
        
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Select defaultValue="grade8">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Grade/Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade8">8th Grade - Class 8A</SelectItem>
                <SelectItem value="grade7">7th Grade - Class 7B</SelectItem>
                <SelectItem value="grade6">6th Grade - Class 6A</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="term2">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term1">Fall Term</SelectItem>
                <SelectItem value="term2">Spring Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
            <div className="bg-slate-100 p-1 rounded-lg flex items-center">
              <button 
                onClick={() => setView('grid')}
                className={`p-1.5 px-3 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${view === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutGrid className="h-4 w-4" /> Grid
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-1.5 px-3 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${view === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <List className="h-4 w-4" /> List
              </button>
            </div>
            <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white">
              Edit Schedule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Main Content Area */}
          <Card className="lg:col-span-3 border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-100 flex flex-row items-center justify-between shrink-0 bg-white z-10">
              <CardTitle className="text-lg font-semibold text-slate-800">Weekly Timetable</CardTitle>
              
              {/* Legend */}
              <div className="hidden md:flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-400"></div> Math</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></div> English</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-orange-400"></div> Science</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-purple-400"></div> History</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-rose-400"></div> PE</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400"></div> Art</div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 overflow-auto flex-1 bg-slate-50/50">
              {view === 'grid' ? (
                <div className="min-w-[800px] w-full">
                  {/* Grid Header */}
                  <div className="grid grid-cols-6 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
                    <div className="p-3 text-center border-r border-slate-200 bg-slate-50 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-slate-400" />
                    </div>
                    {DAYS.map(day => (
                      <div key={day} className="p-3 text-center border-r border-slate-200 last:border-r-0 font-semibold text-slate-700 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Grid Body */}
                  <div className="bg-white">
                    {TIME_SLOTS.map((time, slotIdx) => (
                      <div key={time} className="grid grid-cols-6 border-b border-slate-100 group">
                        <div className="p-3 border-r border-slate-100 bg-slate-50/50 text-xs font-medium text-slate-500 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                          {time}
                        </div>
                        
                        {DAYS.map((day, dayIdx) => {
                          if (isCellSpanned(dayIdx, slotIdx)) return null;
                          
                          const classData = getClassForCell(dayIdx, slotIdx);
                          
                          if (classData) {
                            return (
                              <div 
                                key={`${day}-${time}`} 
                                className={`p-2 border-r border-slate-100 last:border-r-0 relative group/cell`}
                                style={{ gridRow: `span ${classData.span}` }}
                              >
                                <div className={`h-full w-full rounded-md border p-2 flex flex-col ${SUBJECT_COLORS[classData.subject as keyof typeof SUBJECT_COLORS] || 'bg-slate-100 border-slate-200 text-slate-800'} transition-all hover:shadow-md cursor-pointer`}>
                                  <span className="font-bold text-sm leading-tight mb-1">{classData.title}</span>
                                  {classData.subject !== 'Lunch' && (
                                    <>
                                      <span className="text-xs opacity-90">{classData.teacher}</span>
                                      <span className="text-[10px] mt-auto font-medium opacity-80 pt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {classData.room}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <div key={`${day}-${time}`} className="p-2 border-r border-slate-100 last:border-r-0 flex items-center justify-center">
                              <span className="text-slate-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center text-slate-400 h-64 bg-white rounded-lg border border-dashed border-slate-300">
                    <List className="h-12 w-12 mb-4 text-slate-300" />
                    <p>List view configuration</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Today's Classes */}
          <Card className="border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100 bg-white">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center justify-between">
                <span>Today's Classes</span>
                <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 font-normal">Monday</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto bg-slate-50/30">
              <div className="divide-y divide-slate-100">
                {TODAY_CLASSES.map((cls, idx) => (
                  <div key={idx} className="p-4 hover:bg-white transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-sky-600 mb-1">{cls.time}</span>
                        <h4 className="font-bold text-slate-800">{cls.title}</h4>
                      </div>
                      <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${
                        SUBJECT_COLORS[cls.subject as keyof typeof SUBJECT_COLORS]?.split(' ')[0]
                      } ${SUBJECT_COLORS[cls.subject as keyof typeof SUBJECT_COLORS]?.split(' ')[2]}`}>
                        {cls.subject}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> {cls.room}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" /> {cls.teacher}
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Users className="h-3.5 w-3.5 text-slate-400" /> {cls.enrolled} Students Enrolled
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </AppLayout>
  );
}