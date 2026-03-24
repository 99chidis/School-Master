import React from 'react';
import { AppLayout } from './_shared/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  MapPin,
  MoreHorizontal
} from 'lucide-react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate March 2026 days (starts on Sunday, 31 days)
const MARCH_2026_START_DAY = 0; // Sunday
const MARCH_DAYS = 31;
const PREV_MONTH_DAYS = 28; // Feb 2026 has 28 days

// Mock events data for March 2026
const EVENTS = [
  { id: 1, date: 5, title: "Math Exam Gr.5", type: "exam", time: "9:00 AM" },
  { id: 2, date: 12, title: "Science Fair", type: "event", time: "1:00 PM" },
  { id: 3, date: 15, title: "Staff Meeting", type: "meeting", time: "3:30 PM" },
  { id: 4, date: 18, title: "Parent Night", type: "meeting", time: "6:00 PM" },
  { id: 5, date: 20, title: "End of Term 2", type: "event", time: "All Day" },
  { id: 6, date: 23, title: "Spring Break Begins", type: "holiday", time: "All Day", multiDay: true, length: 5 },
  { id: 7, date: 24, title: "Spring Break", type: "holiday", time: "All Day", isContinuation: true },
  { id: 8, date: 25, title: "Spring Break", type: "holiday", time: "All Day", isContinuation: true },
  { id: 9, date: 26, title: "Spring Break", type: "holiday", time: "All Day", isContinuation: true },
  { id: 10, date: 27, title: "Spring Break Ends", type: "holiday", time: "All Day", isContinuation: true },
  { id: 11, date: 30, title: "Classes Resume", type: "event", time: "8:00 AM" },
  { id: 12, date: 31, title: "History Essay Due", type: "exam", time: "11:59 PM" },
];

const UPCOMING_EVENTS = [
  { id: 1, title: "Math Exam Gr.5", date: "March 5, 2026", time: "9:00 AM - 11:00 AM", type: "exam", location: "Main Hall" },
  { id: 2, title: "Science Fair", date: "March 12, 2026", time: "1:00 PM - 4:00 PM", type: "event", location: "Gymnasium" },
  { id: 3, title: "Staff Meeting", date: "March 15, 2026", time: "3:30 PM - 5:00 PM", type: "meeting", location: "Staff Room" },
  { id: 4, title: "Parent Night", date: "March 18, 2026", time: "6:00 PM - 8:00 PM", type: "meeting", location: "Auditorium" },
];

const getEventTypeStyles = (type: string) => {
  switch (type) {
    case 'exam': return 'bg-rose-100 text-rose-700 border-l-2 border-l-rose-500';
    case 'meeting': return 'bg-blue-100 text-blue-700 border-l-2 border-l-blue-500';
    case 'holiday': return 'bg-emerald-100 text-emerald-700 border-l-2 border-l-emerald-500';
    case 'event': return 'bg-amber-100 text-amber-700 border-l-2 border-l-amber-500';
    default: return 'bg-slate-100 text-slate-700 border-l-2 border-l-slate-500';
  }
};

const getEventDotColor = (type: string) => {
  switch (type) {
    case 'exam': return 'bg-rose-500';
    case 'meeting': return 'bg-blue-500';
    case 'holiday': return 'bg-emerald-500';
    case 'event': return 'bg-amber-500';
    default: return 'bg-slate-500';
  }
};

export function Calendar() {
  // Generate grid cells
  const calendarCells = [];
  
  // Previous month trailing days
  for (let i = MARCH_2026_START_DAY - 1; i >= 0; i--) {
    calendarCells.push({
      date: PREV_MONTH_DAYS - i,
      isCurrentMonth: false,
      events: []
    });
  }
  
  // Current month days
  for (let i = 1; i <= MARCH_DAYS; i++) {
    calendarCells.push({
      date: i,
      isCurrentMonth: true,
      events: EVENTS.filter(e => e.date === i),
      isToday: i === 12 // Mock today as March 12
    });
  }
  
  // Next month leading days (to complete the 35 cell grid - 5 weeks)
  const remainingCells = 35 - calendarCells.length;
  // If we need 6 weeks, use 42
  const totalCellsNeeded = calendarCells.length > 35 ? 42 : 35;
  const trailingDays = totalCellsNeeded - calendarCells.length;
  
  for (let i = 1; i <= trailingDays; i++) {
    calendarCells.push({
      date: i,
      isCurrentMonth: false,
      events: []
    });
  }

  return (
    <AppLayout activePage="calendar" pageTitle="School Calendar">
      <div className="flex flex-col gap-6 h-full">
        
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-sky-600" />
              March 2026
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-white hover:shadow-sm">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 font-medium text-slate-700 hover:bg-white hover:shadow-sm">
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-white hover:shadow-sm">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Tabs defaultValue="month" className="hidden md:block">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="month" className="data-[state=active]:bg-white">Month</TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-white">Week</TabsTrigger>
                <TabsTrigger value="day" className="data-[state=active]:bg-white">Day</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white w-full sm:w-auto shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Main Calendar Grid */}
          <Card className="xl:col-span-3 border-slate-200 shadow-sm flex flex-col h-full overflow-hidden bg-white">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="py-3 text-center font-semibold text-slate-600 text-sm">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-200 gap-px">
              {calendarCells.map((cell, idx) => (
                <div 
                  key={idx} 
                  className={`min-h-[120px] p-1.5 flex flex-col gap-1 ${
                    cell.isCurrentMonth ? 'bg-white' : 'bg-slate-50/50'
                  } hover:bg-slate-50 transition-colors`}
                >
                  <div className="flex justify-between items-center px-1 pt-1 mb-1">
                    <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
                      cell.isToday 
                        ? 'bg-sky-600 text-white shadow-sm' 
                        : cell.isCurrentMonth ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {cell.date}
                    </span>
                    
                    {cell.events.length > 2 && (
                      <span className="text-[10px] font-medium text-slate-500">
                        +{cell.events.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1 overflow-y-auto px-1 no-scrollbar">
                    {cell.events.slice(0, 3).map((event: any, eIdx: number) => (
                      <div 
                        key={eIdx} 
                        className={`text-xs px-2 py-1 rounded truncate shadow-sm font-medium ${getEventTypeStyles(event.type)}`}
                        title={event.title}
                      >
                        {event.time !== 'All Day' && !event.isContinuation && (
                          <span className="font-bold opacity-75 mr-1">{event.time.split(' ')[0]}</span>
                        )}
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Panel - Upcoming Events */}
          <div className="flex flex-col gap-6">
            
            {/* Event Legend */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="py-3 border-b border-slate-100 bg-white">
                <CardTitle className="text-sm font-semibold text-slate-800">Event Types</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 w-[45%]">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-sm text-slate-600 font-medium">Exams</span>
                  </div>
                  <div className="flex items-center gap-2 w-[45%]">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-slate-600 font-medium">Meetings</span>
                  </div>
                  <div className="flex items-center gap-2 w-[45%]">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600 font-medium">Holidays</span>
                  </div>
                  <div className="flex items-center gap-2 w-[45%]">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-slate-600 font-medium">Events</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming List */}
            <Card className="border-slate-200 shadow-sm flex-1 flex flex-col">
              <CardHeader className="py-3 border-b border-slate-100 bg-white flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-800">Upcoming List</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 overflow-auto flex-1 bg-slate-50/30">
                <div className="divide-y divide-slate-100">
                  {UPCOMING_EVENTS.map((event) => (
                    <div key={event.id} className="p-4 hover:bg-white transition-colors relative pl-6">
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getEventDotColor(event.type)}`}></div>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800">{event.title}</h4>
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${
                            event.type === 'exam' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                            event.type === 'meeting' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                            event.type === 'event' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                            'text-slate-700 bg-slate-50 border-slate-200'
                          }`}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Clock className="h-3.5 w-3.5 text-slate-400" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" /> {event.location}
                        </div>
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
