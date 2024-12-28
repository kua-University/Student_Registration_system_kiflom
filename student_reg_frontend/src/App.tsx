import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/ThemeProvider"
import Home from '@/pages/Home'
import StudentSignUp from '@/pages/SignUp'
import StudentSignIn from '@/pages/SignIn' 
import AdminSignIn from '@/pages/Admin' 
import { Toaster } from '@/components/ui/toaster'
import StudentDashboard from '@/pages/StudentDashboard'; 
import PaymentSuccess from '@/pages/PaymentSuccess';
import MakePayments from '@/pages/MakePayments';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/add-courses" element={<div>Add Courses</div>} />
          <Route path="/view-grades" element={<div>View Grades</div>} />
          <Route path="/make-payments" element={<MakePayments/>} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <Toaster/>
    </ThemeProvider>
  );
};

export default App;