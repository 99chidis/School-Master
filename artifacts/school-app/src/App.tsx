import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardPage from "@/pages/dashboard";
import StudentsPage from "@/pages/students";
import TeachersPage from "@/pages/teachers";
import ClassesPage from "@/pages/classes";
import GradesPage from "@/pages/grades";
import CalendarPage from "@/pages/calendar";
import FinancePage from "@/pages/finance";
import AttendancePage from "@/pages/attendance";
import MessagesPage from "@/pages/messages";
import LibraryPage from "@/pages/library";
import AdmissionsPage from "@/pages/admissions";
import ReportsPage from "@/pages/reports";
import SettingsPage from "@/pages/settings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/students" component={StudentsPage} />
      <Route path="/teachers" component={TeachersPage} />
      <Route path="/classes" component={ClassesPage} />
      <Route path="/grades" component={GradesPage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/finance" component={FinancePage} />
      <Route path="/attendance" component={AttendancePage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/library" component={LibraryPage} />
      <Route path="/admissions" component={AdmissionsPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
