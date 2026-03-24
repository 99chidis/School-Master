import React from 'react';
import { AppLayout } from './_shared/AppLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Send, Filter, GraduationCap, TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Assignments definitions
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

// Generate mock student grades
const generateGrades = () => {
  const students = [
    "Emma Rodriguez", "Liam Chen", "Olivia Davis", "Noah Smith", "Ava Johnson", 
    "William Taylor", "Sophia Martinez", "James Anderson", "Isabella Thomas", "Benjamin White",
    "Mia Harris", "Lucas Martin", "Charlotte Lee", "Ethan Walker", "Amelia Hall"
  ];
  
  return students.map(name => {
    // Generate semi-random grades but keep Emma smart and James struggling for realism
    let baseScore = name === "Emma Rodriguez" || name === "Ava Johnson" ? 92 : 
                    name === "James Anderson" ? 65 : 
                    name === "Lucas Martin" ? 72 : 82;
                    
    const grades: Record<string, number> = {};
    let total = 0;
    
    ASSIGNMENTS.forEach(a => {
      // Random fluctuation based on base score
      let score = Math.min(100, Math.max(0, Math.round(baseScore + (Math.random() * 16 - 8))));
      grades[a.id] = score;
      
      const weight = parseInt(a.weight);
      total += score * (weight / 100);
    });
    
    return {
      name,
      grades,
      average: Math.round(total)
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
};

const STUDENT_GRADES = generateGrades();

// Calculate class averages
const classAverages: Record<string, number> = {};
let totalClassAvg = 0;

ASSIGNMENTS.forEach(a => {
  const sum = STUDENT_GRADES.reduce((acc, s) => acc + s.grades[a.id], 0);
  classAverages[a.id] = Math.round(sum / STUDENT_GRADES.length);
});

totalClassAvg = Math.round(STUDENT_GRADES.reduce((acc, s) => acc + s.average, 0) / STUDENT_GRADES.length);

// Helper for color coding
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

export function Grades() {
  return (
    <AppLayout activePage="grades" pageTitle="Grades & Reports">
      <div className="flex flex-col gap-6 h-full">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <Tabs defaultValue="gradebook" className="w-full sm:w-auto">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="gradebook" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Grade Book</TabsTrigger>
              <TabsTrigger value="reportcards" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Report Cards</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="bg-white border-slate-200 w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4 text-slate-500" /> Export PDF
            </Button>
            <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white w-full sm:w-auto shadow-sm">
              <Send className="mr-2 h-4 w-4" /> Send Reports
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Main Gradebook Area */}
          <Card className="xl:col-span-3 border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-100 bg-white space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Select defaultValue="class8a">
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class8a">8A</SelectItem>
                      <SelectItem value="class8b">8B</SelectItem>
                      <SelectItem value="class7a">7A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="math">
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics (Alg I)</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English Lit</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="term2">
                    <SelectTrigger className="w-[120px] h-9">
                      <SelectValue placeholder="Term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term1">Fall Term</SelectItem>
                      <SelectItem value="term2">Spring Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-800 ml-auto">
                  <Filter className="h-4 w-4 mr-2" /> Advanced Filters
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 overflow-auto flex-1 bg-white">
              <Table className="w-full">
                <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                  <TableRow className="border-slate-200">
                    <TableHead className="w-[200px] font-bold text-slate-700 shadow-[inset_-1px_0_0_#e2e8f0] bg-slate-50 sticky left-0 z-20">Student Name</TableHead>
                    {ASSIGNMENTS.map((a) => (
                      <TableHead key={a.id} className="text-center min-w-[80px] p-2">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-slate-800 text-xs">{a.name}</span>
                          <span className="text-[10px] text-slate-500 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 mt-1">{a.weight}</span>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center min-w-[100px] font-bold text-slate-800 bg-slate-100 shadow-[inset_1px_0_0_#e2e8f0] sticky right-0 z-20">
                      Overall Avg
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STUDENT_GRADES.map((student) => (
                    <TableRow key={student.name} className="hover:bg-sky-50/30 transition-colors border-slate-100 group">
                      <TableCell className="font-medium text-slate-700 shadow-[inset_-1px_0_0_#e2e8f0] bg-white group-hover:bg-sky-50/30 sticky left-0 z-10 transition-colors">
                        {student.name}
                      </TableCell>
                      {ASSIGNMENTS.map((a) => {
                        const score = student.grades[a.id];
                        return (
                          <TableCell key={`${student.name}-${a.id}`} className="text-center p-2">
                            <div className={`mx-auto w-10 h-8 flex items-center justify-center rounded text-sm font-semibold border ${getGradeColor(score)}`}>
                              {score}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center bg-slate-50 group-hover:bg-sky-50/50 shadow-[inset_1px_0_0_#e2e8f0] sticky right-0 z-10 transition-colors">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-bold text-slate-800">{student.average}%</span>
                          <Badge className={`px-1.5 py-0 min-w-[24px] text-center justify-center ${student.average >= 90 ? 'bg-emerald-500' : student.average >= 80 ? 'bg-blue-500' : student.average >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}>
                            {getLetter(student.average)}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {/* Class Average Row */}
                  <TableRow className="bg-slate-100 hover:bg-slate-100 border-t-2 border-slate-300">
                    <TableCell className="font-bold text-slate-800 shadow-[inset_-1px_0_0_#cbd5e1] bg-slate-100 sticky left-0 z-10">
                      Class Average
                    </TableCell>
                    {ASSIGNMENTS.map((a) => (
                      <TableCell key={`avg-${a.id}`} className="text-center p-2">
                        <div className="mx-auto w-10 h-8 flex items-center justify-center rounded text-sm font-bold text-slate-700 bg-white border border-slate-300">
                          {classAverages[a.id]}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center bg-slate-200 shadow-[inset_1px_0_0_#cbd5e1] sticky right-0 z-10">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-extrabold text-slate-900">{totalClassAvg}%</span>
                        <Badge className={`px-1.5 py-0 min-w-[24px] text-center justify-center ${totalClassAvg >= 90 ? 'bg-emerald-600' : totalClassAvg >= 80 ? 'bg-blue-600' : totalClassAvg >= 70 ? 'bg-amber-600' : 'bg-rose-600'}`}>
                          {getLetter(totalClassAvg)}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Sidebar - Analytics */}
          <div className="flex flex-col gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100 bg-white">
                <CardTitle className="text-base font-semibold text-slate-800">Class Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-5 flex flex-col gap-5">
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Class Average</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-slate-800">{totalClassAvg}%</h3>
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +2.4%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <Trophy className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs font-medium">Highest</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">96%</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                      <span className="text-xs font-medium">Lowest</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">62%</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Pass Rate</span>
                    <span className="font-bold text-emerald-600">93.3%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93.3%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-1">14 of 15 students passing (≥ 70%)</p>
                </div>

              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-blue-50/50">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Needs Attention</h4>
                  <p className="text-sm text-slate-600 mb-3 leading-snug">
                    <span className="font-semibold">James Anderson</span> is currently failing with a 65% average.
                  </p>
                  <Button size="sm" className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
                    Schedule Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </AppLayout>
  );
}
